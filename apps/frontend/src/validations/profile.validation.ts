import { z } from "zod";

export const ValidateProfile = z.object({
  firstName: z
    .string()
    .min(3, { message: "name must at least contains 3 characters" }),
  lastName: z
    .string()
    .min(3, { message: "name must at least contains 3 characters" }),
  phones: z
    .array(
      z
        .string()
        .min(8, { message: "phone number must at least contains 8 characters" })
    )
    .nonempty({ message: "at least 1 phone number is required" }),
  emails: z
    .array(z.string().email())
    .nonempty({ message: "at least 1 email is required" }),
  skills: z.array(
    z.string().min(5, { message: "skill must at least contains 5 characters" })
  ),
  education: z.array(
    z.object({
      date: z.date(),
      major: z
        .string()
        .min(8, { message: "major must at least contains 8 characters" }),
      institution: z
        .string()
        .min(8, { message: "institution must at least contains 8 characters" }),
      gpa: z
        .number()
        .min(0.1, { message: "gpa must at least 0.1" })
        .max(4, { message: "gpa must at most 4" }),
    })
  ),
  socialLinks: z.array(
    z.object({
      url: z
        .string()
        .regex(
          /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
          { message: "invalid url" }
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
  address: z.object(
    {
      city: z
        .string()
        .min(3, { message: "city must at least contains 3 characters" }),
      state: z
        .string()
        .min(3, { message: "state must at least contains 3 characters" }),
      country: z
        .string()
        .min(3, { message: "country must at least contains 3 characters" }),
      zip: z
        .string()
        .min(6, { message: "zip must at least contains 6 characters" }),
    },
    { invalid_type_error: "invalid address" }
  ),
});
