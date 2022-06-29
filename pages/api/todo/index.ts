import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { Db, ObjectId } from 'mongodb';
import connectToDB from '../../../src/lib/db';
import TodoValidation from '../../../src/validations/todo';
import { formatError } from '../../../src/validations';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });

  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  const username = (token.user as any).username;

  let db: Db;
  try {
    db = await connectToDB();
  } catch (err) {
    return res.status(400).json({ message: 'Database error' });
  }

  const collection = db.collection('users');

  if (req.method === 'GET') {
    const user = await collection.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Unauthenticated' });
    }

    const todos = user.todos;

    return res.status(200).json({ todos });
  }

  if (req.method === 'POST') {
    const { title, content, status } = req.body;

    try {
      await TodoValidation.validate({ title, content, status });
    } catch (error) {
      return res.status(400).json({ message: formatError(error) });
    }

    const _id = new ObjectId();
    const createdAt = new Date();

    await collection.updateOne(
      { username },
      {
        $push: {
          todos: { title, content, status, _id, createdAt }
        }
      }
    );

    return res
      .status(201)
      .json({ todo: { title, content, status, _id, createdAt } });
  }

  return res.status(400).json({ message: 'Route does not exist' });
}
