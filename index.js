require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const app = express();
app.use(express.json());
app.use(cors());
app.options('*', cors());
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
app.use('/api/contract', require('./routes/contract.routes'));
app.use('/api/request', require('./routes/request.routes'));
app.use('/api/address', require('./routes/address.routes'));
app.use('/api/payment', require('./routes/payment.routes'));
//
const URI = process.env.MONGODB_URL_LOCAL;
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
  },
);
app.get('/', (req, res) => {
  res.json({ msg: 'Hello everyone' });
});
const PORT = process.env.PORT || 5000;

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('join', ({ name, room }) => {
    console.log(name, room);
  });
  socket.on('disconnect', () => {
    console.log('User had left');
  });
});
server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
