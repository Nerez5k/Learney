import { db } from "@/db";
import { flashcardCreationSchema } from "@/lib/validators/flashcard";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import axios from "axios";

export async function POST(req: Request, res: Response) {
  try {
    const { getUser } = getKindeServerSession();
    const user = getUser();
    if (!user.id) {
      return Response.json(
        { error: "You must be logged in to create a game." },
        {
          status: 401,
        }
      );
    }
    const body = await req.json();
    const { topic, title, amount } = flashcardCreationSchema.parse(body);
    const createdFlashcard = await db.flashcard.create({
      data: {
        userId: user.id,
        topic: topic,
        title: title,
      },
    });
    console.log("PROBUJE WYSLAC");
    const { data } = await axios.post(
      `http://localhost:3000/api/flashcardItems`,
      {
        amount,
        topic,
        title,
      }
    );
    console.log("returned data", data);
    type flashcardItem = {
      frontText: string;
      backText: string;
    };
    const flashcardItems = data.flashcards.map((item: flashcardItem) => {
      return {
        flashcardId: createdFlashcard.id, // Id nowo utworzonej fiszki
        frontText: item.frontText, // Zakładając, że takie pole istnieje w obiekcie
        backText: item.backText, // Zakładając, że takie pole istnieje w obiekcie
      };
    });

    await db.flashcardItem.createMany({
      data: flashcardItems,
    });

    return Response.json({}, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json(
      { error: "Cos nie smigggga" },
      {
        status: 500,
      }
    );
  }
}
