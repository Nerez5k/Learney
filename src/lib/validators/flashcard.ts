import { z } from "zod";

export const flashcardCreationSchema = z.object({
  title: z.string(),
  topic: z
    .string()
    .min(4, { message: "Topic must be at least 4 characters long" })
    .max(50),
  amount: z.number().min(1).max(15),
});
