require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  }),
);

// Router

app.use('/api/user', require('./routes/user.routes'));
app.use('/api', require('./routes/upload.routes'));
app.use('/api/vehicle', require('./routes/vehicle.routes'));
app.use('/api/post', require('./routes/post.routes'));
//
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
    // eslint-disable-next-line no-console
    console.log('Connect to Mongodb ');
  },
);
app.get('/', (req, res) => {
  res.json({ msg: 'Hello everyone' });
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running is http://localhost:${PORT}`);
});
