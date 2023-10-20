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
      date: z.date({ coerce: true }),
      major: z
        .string()
        .min(8, { message: "major must at least contains 8 characters" }),
      institution: z
        .string()
        .min(8, { message: "institution must at least contains 8 characters" }),
      gpa: z
        .number({ coerce: true })
        .min(0.1, { message: "gpa must at least 0.1" })
        .max(4, { message: "gpa must at most 4" }),
    })
  ),
  socialLinks: z.array(
    z
      .string()
      .regex(
        /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})? /,
        { message: "invalid url" }
      )
  ),
  address: z.object(
    {
      country: z
        .string({ required_error: "country is required" })
        .min(3, { message: "country must at least contains 3 characters" }),
      region: z
        .string({ required_error: "region is required" })
        .min(3, { message: "region must at least contains 3 characters" }),
    },
    {
      invalid_type_error: "invalid address",
      required_error: "address is required",
    }
  ),
});
