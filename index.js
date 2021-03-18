require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
// const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  }),
);

app.use('/user', require('./routes/user_router'));
app.use('/api', require('./routes/upload'));
const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log('Connect to Mongodb ');
  },
);
// if(process.env.NODE_ENV === 'production'){
//   app.use(express.static('client/build'))
  // app.get('*', (req, res)