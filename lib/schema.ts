import { z } from "zod";

export const appFormSchema = z.object({
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Usa solo minusculas, numeros y guiones."),
  name: z.string().min(2),
  tagline: z.string().min(8),
  short_description: z.string().min(20),
  long_description: z.string().min(40),
  status: z.enum(["draft", "published", "archived", "coming_soon"]),
  category: z.string().min(2),
  platform: z.string().min(2),
  support_email: z.string().email(),
  primary_cta_label: z.string().min(2),
  primary_cta_url: z.string().min(1)
});

export type AppFormValues = z.infer<typeof appFormSchema>;
