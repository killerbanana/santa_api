import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import BadRequest from "src/core/exceptions/bad-request";
import { validationError } from "src/core/shared/validation-error";

class ResolutionCreateValidator {
  static async handle(req: Request, _: Response, next: NextFunction) {
    const schema = Joi.object({
      data: Joi.object({
        resolutionNumber: Joi.string().min(1).required(),
        series: Joi.string().min(1).required(),
        date: Joi.string().min(1).required(),
        title: Joi.string().min(1).required(),
        author: Joi.string().min(1).required(),
        filePath: Joi.string().min(1).required(),
        time: Joi.string().min(1).required(),
        type: Joi.string().min(1).required(),
        size: Joi.string().min(1).required(),
        tag: Joi.string().min(1).required(),
        reading: Joi.string().min(1).required(),
        created: Joi.string().min(1).required(),
        updated: Joi.string().min(1).required(),
      }),
    });

    const validated = schema.validate(req.body, {
      abortEarly: false,
    });

    if (validated.error)
      throw new BadRequest(
        validationError(validated),
        "ResolutionCreateValidator.handle"
      );

    next();
  }
}

export default ResolutionCreateValidator;
