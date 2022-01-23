class ValidationError extends Error {}

const handleError = (err, req, res, next) => {
  // //jeżeli w  programie jest możliwość błędu 404 - wejścia w zły ares powinien byc tutaj do tego kod
  // if (err instanceof NotFoundError) {
  //   res.status(404).render('error', {
  //     message: 'Nie można znaleźć elementu o tym ID.',
  //   });
  //   return;
  // }
  console.error(err);

  res.status(err instanceof ValidationError ? 400 : 500).render('error', {
    message:
      err instanceof ValidationError
        ? err.message
        : 'Przepraszamy. Spróbuj ponownie za kilka minut...',
  });
};

module.exports = {
  handleError,
  ValidationError,
};
