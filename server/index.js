require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const API = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/';
const options = {
  headers: {
    Authorization: process.env.AUTH_TOKEN,
  },
};

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/styles/:productId', (req, res) => {
  axios.get(`${API}products/${req.params.productId}/styles`, options)
    .then((response) => res.send(response.data))
    .catch((err) => res.send(err));
});

app.get('/products/:productId', (req, res) => {
  axios.get(`${API}products/${req.params.productId}`, options)
    .then((response) => res.send(response.data))
    .catch((err) => res.send(err));
});

app.get('/qa/questions/:product_id', (req, res) => {
  axios.get(`${API}qa/questions/?product_id=${req.params.product_id}&count=100`, options)
    .then((response) => res.send(response.data))
    .catch((err) => res.send(err));
});

app.get('/qa/questions/:question_id/answers', (req, res) => {
  axios.get(`${API}qa/questions/${req.params.question_id}/answers?count=10`, options)
    .then((response) => res.send(response.data.results))
    .catch((err) => res.send(err));
});

app.get('/reviews/:review_id', (req, res) => {
  const currentID = req.params.review_id;
  axios.get(`${API}reviews?product_id=${currentID}&count=100`, options)
    .then((response) => res.send(response.data))
    .catch((error) => res.send(error));
});

app.get('/meta/:review_id', (req, res) => {
  const currentID = req.params.review_id;
  axios.get(`${API}reviews/meta?product_id=${currentID}`, options)
    .then((response) => res.send(response.data))
    .catch((error) => res.send(error));
});

app.get('/relatedTo/:productId', (req, res) => {
  axios.get(`${API}products/${req.params.productId}/related`, options)
    .then((response) => res.send(response.data))
    .catch((err) => res.send(err));
});

app.post('/reviews/addReview', (req, res) => {
  const message = req.body;
  axios.post(`${API}reviews`, message, options) // body object
    .then((response) => res.send(response.data))
    .catch((error) => res.send(error));
});

app.put('/reviews/putHelpful', (req, res) => {
  const ID = req.body;
  axios.put(`${API}reviews/${ID.review_id}/helpful`, ID, options)
    .then((response) => res.send(response.data))
    .catch((error) => res.end(error));
});

app.put('/reviews/putReport', (req, res) => {
  const ID = req.body;
  axios.put(`${API}reviews/${ID.review_id}/report`, ID, options)
    .then((response) => res.send(response.data))
    .catch((error) => res.end(error));
});

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  axios.put(`${API}qa/questions/${req.body.id}/helpful`, { question_id: req.body.id }, options)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => res.send(err));
});

app.put('/qa/questions/:question_id/report', (req, res) => {
  axios.put(`${API}qa/questions/${req.body.id}/report`, { question_id: req.body.id }, options)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => res.send(err));
});

app.put('/answers/helpful', (req, res) => {
  axios.put(`${API}qa/answers/${req.body.id}/helpful`, { answer_id: req.body.id }, options)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => res.send(err));
});

app.post('/addanswer/:question_id', (req, res) => {
  axios.post(`${API}qa/questions/${req.params.question_id}/answers`, req.body, options)
    .then((response) => res.send(response.data))
    .catch((err) => res.send(err));
});

app.post('/addquestion', (req, res) => {
  axios.post(`${API}qa/questions`, req.body, options)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => res.send(err));
});

app.post('/click', (req, res) => {
  axios.post(`${API}interactions`, req.body, options)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => res.send(err));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Listening on port ${PORT}`);
