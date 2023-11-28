import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

import OpenAI from 'openai';

import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { createClient } from "@supabase/supabase-js";
 
const f = createUploadthing();
 
export const ourFileRouter = {
  fileUploader: f({ pdf: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
        
            const { getUser } = getKindeServerSession();
            const user = getUser();

            if(!user || !user.id) throw new Error("Unauthorized");
            return {userId: user.id};
    })
    .onUploadComplete(async ({ metadata, file }) => {
        const createdFile = await db.file.create({
            data: {
                key: file.key,
                name: file.name,
                userId: metadata.userId,
                url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
                uploadStatus: 'PROCESSING',
                fileType: 'pdf',
            }
        });

        try {
            const response = await fetch(`https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`);
            const blob = await response.blob();

            const loader = new PDFLoader(blob);

            const pageLevelDocs = await loader.load();

            const pagesAmt = pageLevelDocs.length;


            const embeddings = new OpenAIEmbeddings({
                openAIApiKey: process.env.OPENAI_API_KEY,
            });

            const privateKey = process.env.SUPABASE_PRIVATE_KEY;
                if (!privateKey) throw new Error(`Expected env var SUPABASE_PRIVATE_KEY`);

            const url = process.env.SUPABASE_URL;
                if (!url) throw new Error(`Expected env var SUPABASE_URL`);

            const supabaseClient = createClient(url, privateKey);

            for(const document of pageLevelDocs) {
                let pageContent = document.pageContent;
                let metadata = document.metadata;
            
                const openai = new OpenAI({
                    apiKey: process.env.OPENAI_API_KEY,
                });
            
                const params = {
                    model: "text-embedding-ada-002",
                    input: pageContent
                };
            
                try {
                    const embeddingResult = await openai.embeddings.create(params);
                    
                    const embeddingVector = embeddingResult.data[0].embedding;
            
                    const embeddingText = JSON.stringify(embeddingVector);
            
                    await supabaseClient.from('documents').insert({
                        file_id: createdFile.id,
                        embedding: embeddingText,
                        content: pageContent,
                        metadata: metadata,
                    });
                } catch (error) {
                    console.error('Error while generating or inserting embeddings:', error);
                }
            }


            await db.file.update({
                data: {
                    uploadStatus: "SUCCESS"
                },
                where: {
                    id: createdFile.id,
                
                }
            })
        }
        catch (err)
        {
            console.log("BLAD: ", err);
            await db.file.update({
                data: {
                    uploadStatus: "FAILED"
                },
                where: {
                    id: createdFile.id,
                
                }
            })
        }
        
    }),

} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;

//6 godzina 56m