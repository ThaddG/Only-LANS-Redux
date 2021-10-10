import { Request, Response } from 'express';
import { controller } from '../controller';
import { get, post, reqBodyValidator } from './decorators';
import { Message, MessageProps, Chat, User } from '../models';
import dayjs from 'dayjs';
import { CallbackError } from 'mongoose';

@controller('')
export class MessageController {
  // create new message
  @post('/message')
  @reqBodyValidator('Sender', 'Content', 'ChatId')
  async create(req: Request, res: Response): Promise<void> {
    const { Sender, Content, ChatId } = req.body;
    try {
      const message: MessageProps = new Message({
        Sender,
        Content,
        CreatedDate: dayjs(),
        ChatId,
      });
      await message.save();
      res.send({ message: 'success', data: message });
      return;
    } catch (err) {
      res.status(500).send({ message: `Create new message error ${err}` });
      return;
    }
  }

  // get all messages in a chat room
  @get('/messages/chat/:id')
  async getMessagesFromChat(req: Request, res: Response): Promise<void> {
    // check if chat id is valid
    const chatIdParam = req.params.id;

    try {
      // make sure the chat exists
      await Chat.findById(chatIdParam, (err: CallbackError) => {
        if (err) return res.status(400).send({ message: 'Invalid room id' });
      });

      // find the messages that have the chatId
      const messages: MessageProps[] = await Message.find({
        ChatId: chatIdParam,
      });

      if (!messages) {
        res.status(400).send('No messages returned');
        return;
      }

      res.send({ message: 'success', data: messages });
    } catch (err) {
      res.status(500).send({ message: 'Query check failed' });
      return;
    }
  }

  // get messages sent by a user
  @get('/messages/user/:id')
  async getByUser(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;

    // get the user
    await User.findById(userId, (err: CallbackError) => {
      if (err) return res.status(400).send({ message: 'Invalid user id' });
    });

    // find the messages that have the chatId
    const messages: MessageProps[] = await Message.find({
      Sender: userId,
    });

    if (!messages) {
      res.status(400).send('No messages returned');
      return;
    }

    res.send({ message: 'success', data: messages });
  }

  @get('/messages/user/:userId/chat/:chatId')
  async getByUserAndChat(req: Request, res: Response): Promise<void> {
    const { userId, chatId } = req.params;

    try {
      // get the user
      await User.findById(userId, (err: CallbackError) => {
        if (err) return res.status(400).send({ message: 'Invalid user id' });
      });

      // make sure the chat exists
      await Chat.findById(chatId, (err: CallbackError) => {
        if (err) return res.status(400).send({ message: 'Invalid room id' });
      });

      const messages: MessageProps[] = await Message.find({
        Sender: userId,
        ChatId: chatId
      });

      res.send({ message: 'success', data: messages });
    } catch (err) {
      res
        .status(500)
        .send({ message: 'Get by user and chat error', error: err });
      return;
    }
  }
}
