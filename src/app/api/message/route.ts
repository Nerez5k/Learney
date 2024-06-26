import { db } from "@/db";
import { openai } from "@/lib/openai";
import { SendMessageValidator } from "@/lib/validators/SendMessageValidator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";

import { OpenAIStream, StreamingTextResponse } from "ai";

export const POST = async (req: NextRequest) => {
  try {
    console.log("Request received");
    const body = await req.json();

    console.log("Request body:", body);

    const { getUser } = getKindeServerSession();
    const user = getUser();

    const { id: userId } = user;

    if (!userId) return new Response("Unauthorized", { status: 401 });

    const { fileId, message } = SendMessageValidator.parse(body);

    console.log("File ID:", fileId, "Message:", message);

    const file = await db.file.findFirst({
      where: {
        id: fileId,
        userId,
      },
    });

    if (!file) return new Response("Not found", { status: 404 });

    await db.message.create({
      data: {
        text: message,
        isUserMessage: true,
        userId,
        fileId,
      },
    });

    const privateKey = process.env.SUPABASE_PRIVATE_KEY;
    if (!privateKey) throw new Error(`Expected env var SUPABASE_PRIVATE_KEY`);

    const url = process.env.SUPABASE_URL;
    if (!url) throw new Error(`Expected env var SUPABASE_URL`);

    const supabase = createClient(url, privateKey);

    const params = {
      model: "text-embedding-ada-002",
      input: message,
    };

    const embeddingResult = await openai.embeddings.create(params);

    const embeddingVector = embeddingResult.data[0].embedding;

    const embeddingText = JSON.stringify(embeddingVector);

    const results = await supabase.rpc("match_documents", {
      query_embedding: embeddingText,
      match_count: 1,
      file_id_filter: fileId,
    });

    if (results.error) {
      console.error("An error occurred:", results.error);
      return new Response(JSON.stringify({ error: results.error.message }), {
        status: 500,
      });
    }

    if (!Array.isArray(results.data)) {
      console.error("Expected an array of results, but got:", results.data);
      return new Response(
        JSON.stringify({ error: "Bad response from database" }),
        {
          status: 500,
        }
      );
    }

    const pageContentJoined = results.data.map((r) => r.content).join("\n\n");

    const prevMessages = await db.message.findMany({
      where: {
        fileId,
      },
      orderBy: {
        createdAt: "asc",
      },
      take: 6,
    });

    const formattedPrevMessages = prevMessages.map((msg) => ({
      role: msg.isUserMessage ? ("user" as const) : ("assistant" as const),
      content: msg.text,
    }));

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      temperature: 0,
      stream: true,
      messages: [
        {
          role: "system",
          content:
            "Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format. Remember to ONLY use one of them both, dont make up an answer basing on your knowledge.",
        },
        {
          role: "user",
          content: `Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format. Remember to ONLY use one of them both, dont make up an answer basing on your knowledge.\nIf you don't know the answer, just say that you don't know, don't try to make up an answer.
              
        \n----------------\n
        
        PREVIOUS CONVERSATION:
        ${formattedPrevMessages.map((message) => {
          if (message.role === "user") return `User: ${message.content}\n`;
          return `Assistant: ${message.content}\n`;
        })}
        
        \n----------------\n
        
        CONTEXT:
        ${pageContentJoined}
        
        USER INPUT: ${message}`,
        },
      ],
    });

    const stream = OpenAIStream(response, {
      async onCompletion(completion) {
        await db.message.create({
          data: {
            text: completion,
            isUserMessage: false,
            fileId,
            userId,
          },
        });
      },
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("Error occurred: " + error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};
