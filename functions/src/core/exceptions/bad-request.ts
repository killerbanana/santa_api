import { BaseError } from "./base-error";
import { HttpStatusCode } from "src/core/enums/http-status-code";

class BadRequest extends BaseError {
  constructor(description: string, methodName: string = "") {
    super(description, "Bad Request", methodName, HttpStatusCode.BAD_REQUEST);
  }
}

export default BadRequest;
