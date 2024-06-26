import { checkAnswerSchema } from "@/schemas/questions";
import { ZodError } from "zod";
import { db } from "@/db";
import { stringSimilarity } from "string-similarity-js";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { questionId, userInput } = checkAnswerSchema.parse(body);
    const question = await db.quizQuestion.findUnique({
      where: { id: questionId },
    });
    if (!question) {
      return Response.json(
        {
          message: "Question not found",
        },
        {
          status: 404,
        }
      );
    }
    await db.quizQuestion.update({
      where: { id: questionId },
      data: { userAnswer: userInput },
    });
    if (question.questionType === "multiple_choice") {
      const isCorrect =
        question.answer.toLowerCase().trim() === userInput.toLowerCase().trim();
      await db.quizQuestion.update({
        where: { id: questionId },
        data: { isCorrect },
      });
      return new Response(JSON.stringify({ isCorrect }), { status: 200 });
    } else if (question.questionType === "open_ended") {
      let percentageSimilar = stringSimilarity(
        question.answer.toLowerCase().trim(),
        userInput.toLowerCase().trim()
      );
      percentageSimilar = Math.round(percentageSimilar * 100);
      await db.quizQuestion.update({
        where: { id: questionId },
        data: { percentageCorrect: percentageSimilar },
      });
      return new Response(JSON.stringify({ percentageSimilar }), {
        status: 200,
      });
    }
    return new Response(JSON.stringify({ message: "Invalid question type" }), {
      status: 400,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json(
        {
          message: error.issues,
        },
        {
          status: 400,
        }
      );
    }
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
