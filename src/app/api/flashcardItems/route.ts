import { strict_output } from "@/lib/strictGpt";
import { flashcardCreationSchema } from "@/lib/validators/flashcard";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    console.log("CIALO", body);
    const { topic, amount, title } = flashcardCreationSchema.parse(body);
    console.log("asdasdsa");
    let flashcardsItems: any;
    flashcardsItems = await strict_output(
      "You are a helpful AI that is able to generate a pair of question and answers, the length of each answer should not be more than 15 words, store all the pairs of answers and questions in a JSON array",
      new Array(1).fill(
        `You are to generate a random ${amount} flashcards about ${topic}`
      ),
      {
        frontText: "Front text of flashcard, use 1-3 words",
        backText: "explanation of the concept on the front of the flashcard",
      }
    );
    console.log("WYSYLANE DANE:", flashcardsItems);
    return NextResponse.json(
      {
        flashcardsItems: flashcardsItems,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An unexpected error occurred. (ITEMS)" },
      {
        status: 500,
      }
    );
  }
}
