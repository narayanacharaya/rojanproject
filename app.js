const express = require("express");
const app = express();
const bodyParser = require("body-parser");


app.use(bodyParser.json());

const mongoose = require("mongoose");
const userRouter = require("./routes/register");
const login = require("./routes/login")
const product= require("./routes/product")
const search = require("./routes/filter")
const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hcmF5YW4iLCJjYXRlZ29yeSI6InB1Ymxpc2hlciIsImVtYWlsIjoidGVzdDFAZ21haWwuY29tIiwiaWQiOiI2NDYxYWJjMjkzNzhkMWUxMzBmYjE2YmEiLCJpYXQiOjE2OTI4NzAyMjMsImV4cCI6MTY5NTQ2MjIyM30.X1ontC1cJIvP8k6u9O_1FAh9tMCyfFWmo4ZiiWqqais';

mongoose.connect('mongodb+srv://rojantiwari17:Lighthero123@ecommerce.ai9w4n2.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  });
mongoose.connection.on('error', error => {
  console.error('MongoDB connection error:', error.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});
app.use("/registration", userRouter);
app.use("/login", login);
app.use("/product", product);
app.use("/search", search);

app.listen(5000, () => {
  console.log('Server running on port 3000');
});

module.exports = app;
