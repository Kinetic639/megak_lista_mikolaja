import { NextFunction, Request, Response } from "express";

export class ValidationError extends Error {}

export const handleError = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  // //jeżeli w  programie jest możliwość błędu 404 - wejścia w zły ares powinien byc tutaj do tego kod
  // if (err instanceof NotFoundError) {
  //   res.status(404).render('error', {
  //     message: 'Nie można znaleźć elementu o tym ID.',
  //   });
  //   return;
  // }
  console.error(err);

  res
      .status(err instanceof ValidationError ? 400 : 500)
      .render('error', {
    message:
      err instanceof ValidationError
        ? err.message
        : 'Przepraszamy. Spróbuj ponownie za kilka minut...',
  });
};
