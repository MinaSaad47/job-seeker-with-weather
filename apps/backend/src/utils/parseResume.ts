import mammoth from "mammoth";
import pdf from "pdf-parse";

const phoneRegex = /(\+\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}/g;
const emailRegex = /[\w\.-]+@[\w\.-]+\.\w+/g;
const urlRegex =
  /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;

export async function parseResume(path: string, mimetype: string) {
  let text = "";

  if (mimetype.includes("pdf")) {
    text = await parsePdf(path);
  } else {
    text = await parseMSDoc(path);
  }

  const emails = text.match(emailRegex);
  const phones = text.match(phoneRegex);
  const urls = text.match(urlRegex);

  return { emails, phones, urls };
}

async function parsePdf(path: string) {
  const data = await pdf(path as any);
  return data.text;
}

async function parseMSDoc(path: string) {
  const data = await mammoth.extractRawText({ path });
  return data.value;
}
