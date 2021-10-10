import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { AppRouter } from './AppRouter';
// CONTROLLERS
import './controllers/AuthController';
import './controllers/ChatController';
import './controllers/MessageController';

const env = dotenv.config();
const app = express();
const router = AppRouter.getInstance();

// MONGODB SETUP
const mongoUri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.fvknh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// CONNECT MONGOOSE
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
});
mongoose.connection.on('error', (err) => {
  console.error('Error connecting to mongo', err);
});

app.use(express.json());
// app.use(router);
app.use(AppRouter.getInstance());

router.get('/', (req: Request, res: Response) => {
  res.send(`
    <div>
      <h1>Home Page</h1>
    </div>
  `);
});

app.listen(4000, () => {
  console.log('listening on port 4000');
});
