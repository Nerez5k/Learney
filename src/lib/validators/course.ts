import { z } from "zod";

export const crateChapterSchema = z.object({
    title: z.string().min(3).max(255),
    units: z.array(z.string()),
});