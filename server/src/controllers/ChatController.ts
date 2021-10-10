import { Request, Response } from 'express';
import { controller } from '../controller';
import { get, post } from './decorators';
import { Chat, ChatProps } from '../models';
import dayjs from 'dayjs';

@controller('')
export class ChatController {
  // create a chat
  @post('/chat')
  async create(req: Request, res: Response): Promise<void> {
    try {
      const chat: ChatProps = new Chat({
        CreatedDate: dayjs(),
      });
      await chat.save();
      res.send({ message: 'Chat created', chat });
    } catch (err) {
      console.error('Create chat error', err);
    }
  }

  // get a chat by id
  @get('/chat/:id')
  async getChat(req: Request, res: Response): Promise<void> {
    const paramId = req.params.id;

    try {
      const chat: ChatProps | null = await Chat.findById(paramId);
      res.send(chat);
    } catch (err) {
      console.error('Get chat by id error:', err);
      res.status(400).send({ message: 'Chat not found' });
    }
  }

  // get all chats
  @get('/chats')
  async getChats(req: Request, res: Response): Promise<void> {
    try {
      const chats: ChatProps[] = await Chat.find();
      if (!chats) res.status(400).send({ message: 'No chats' });
      res.send(chats);
      return;
    } catch (err) {
      res.status(500).send({ message: `Get all chats error ${err}` });
      return;
    }
  }
}
