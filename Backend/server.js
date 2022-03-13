require('dotenv').config();
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});

console.log(process.env.DATABASE_HOST + process.env.DATABASE_NAME)

mongoose
  .connect(process.env.DATABASE_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(`${process.env.DATABASE_NAME} db connected successfully`);
  })
  .catch((err) => {
    console.log(err);
    console.log('db error');
    process.exit(1);
  });


const app = require('./app');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server- ${PORT}`);
});
