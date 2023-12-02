import express from 'express';
import userRoute from './Routes/user.js';
import authRoute from './Routes/auth.js';
import truckRoute from './Routes/truck.js'
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/truck', truckRoute);
app.use(bodyParser.json({ limit: '50mb' }));
app.get('/', (req, res) => {
  res.send('working');
});

const PORT = 3400;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
