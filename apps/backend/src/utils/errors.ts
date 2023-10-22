export class InvalidMimetypeError extends Error {
  constructor() {
    super("invalid mimetype");
    this.name = "InvalidMimetypeError";
  }
}
