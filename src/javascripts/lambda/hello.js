exports.handler = function (event, context, callback) {
  const superDuperSecretApi = process.env.SECRET;
  callback(null, {
    statusCode: 200,
    body: `Hello ${superDuperSecretApi}`,
  });
};
