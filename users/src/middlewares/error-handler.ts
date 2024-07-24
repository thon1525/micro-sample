import { Request, Response, NextFunction } from "express";
import BaseCustomError from "../errors/base-custom-error";
import { StatusCode } from "../utils/consts/status-code";
import { logger } from "@users/utils/logger";

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response => {
  logger.error(`ErrorHandler() method error: ${err}`)
  // If the error is an instance of our own throw ERROR
  if (err instanceof BaseCustomError) {
    return res.status(err.getStatusCode()).json(err.serializeErrorOutput());
  }

  return res
    .status(StatusCode.InternalServerError)
    .json({ errors: [{ message: "An unexpected error occurred" }] });
};

export { errorHandler };
