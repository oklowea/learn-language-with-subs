const express = require('express');

const app = express();
const request = require('request');

const port = 3000;

app.use(express.static('dist'));

app.get('/api/translate', (req, res) => {
  request(
    `https://iapi.glosbe.com/iapi3/wordlist?l1=en&l2=ru&q=${req.query.q}&after=20&before=0&env=en`,
    (err, response, body) => {
      if (err) {
        return res.status(500).send({ message: err });
      }

      return res.send(body);
    },
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
