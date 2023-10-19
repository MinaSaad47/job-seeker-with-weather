import { z } from "zod";

export const ValidateProfile = z
  .object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    phones: z.array(z.string().min(8)).nonempty(),
    emails: z.array(z.string().email()).nonempty(),
    skills: z.array(z.string().min(5)),
    education: z.array(
      z.object({
        date: z.date(),
        major: z.string().min(8),
        institution: z.string().min(8),
        gpa: z.number().min(0.1).max(4),
      })
    ),
    socialLinks: z.array(
      z.object({
        url: z
          .string()
          .regex(
            /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/
          ),
        type: z.enum([
          "website",
          "facebook",
          "instagram",
          "linkedin",
          "twitter",
          "github",
        ]),
      })
    ),
    address: z.object({
      city: z.string(),
      state: z.string(),
      country: z.string(),
      zip: z.string(),
      coordinates: z.object({
        lat: z.number(),
        lng: z.number(),
      }),
    }),
  })
  .openapi("ValidateProfile");
