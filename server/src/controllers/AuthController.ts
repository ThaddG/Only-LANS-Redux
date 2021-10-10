import { Request, Response } from 'express';
import { Document } from 'mongoose';
import { controller } from '../controller';
import { get, patch, post, reqBodyValidator } from './decorators';
import { User, UserProps } from '../models';

@controller('/auth')
export class AuthController {
  @get('/login')
  async login(req: Request, res: Response): Promise<void> {
    res.send(`<div><h1>Login Page</h1></div>`);
  }

  @post('/signup')
  @reqBodyValidator('Name', 'Email')
  async signup(req: Request, res: Response): Promise<void> {
    const { Name, Email } = req.body;
    console.log("🚀 ~ AuthController ~ signup ~ Name", Name);
    try {
      const user: UserProps = new User({ Name, Email });
      await user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(`Signup Error ${err}`);
    }
  }

  @patch('/user/:id')
  async updateUser(req: Request, res: Response): Promise<void> {
    const paramId = req.params.id;

    // Return invalid if the body is empty
    if (Object.keys(req.body).length <= 0)
      res.status(422).send('Invalid Request');

    try {
      await User.findByIdAndUpdate(
        { _id: paramId },
        req.body,
        { new: true },
        (err, result) => {
          if (err) {
            res.status(400).send('User not found');
            return;
          }
          res.send(result);
        }
      );
    } catch (err) {
      res.status(500).send({ message: 'Update failed' });
    }
  }

  @get('/user/:id')
  async getById(req: Request, res: Response): Promise<void> {
    const paramId = req.params.id;

    try {
      const user: Document<UserProps> | null = await User.findById(paramId);
      if (user) res.send(user);
    } catch (err) {
      res.status(404).send({ message: 'User not found' });
    }
  }

  @get('/users')
  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users: Document<UserProps>[] = await User.find({}, (err) => {
        if (err) {
          res.status(400).send({ message: 'No users found' });
          return;
        }
        res.send(users);
      });
    } catch (err) {
      res.status(422).send('Invalid request');
    }
  }
}
