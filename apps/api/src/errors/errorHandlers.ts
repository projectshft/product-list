import { Request, Response, NextFunction } from 'express';
import { ValidateError } from 'tsoa';

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    res.status(422).json({
      message: 'Validation Failed',
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    console.warn(`Caught Error:`, err.message);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
  next();
};

export const notFoundHandler = (_req: Request, res: Response) => {
  res.status(404).send({
    message: 'Not Found',
  });
};
