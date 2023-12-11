import { z } from "zod";

export const flashcardCreationSchema = z.object({
  title: z.string(),
  frontText: z.string(),
  backText: z.string(),
  amount: z.number().min(1).max(15),
});
