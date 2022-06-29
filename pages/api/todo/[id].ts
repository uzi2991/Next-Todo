import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { Db, ObjectId } from 'mongodb';
import connectToDB from '../../../src/lib/db';

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

  const { id } = req.query as { id: string };
  if (req.method === 'DELETE') {
    await collection.updateOne(
      { username },
      {
        $pull: {
          todos: {
            _id: new ObjectId(id)
          }
        }
      }
    );

    return res.status(200).json({ message: 'Successful delete' });
  }

  if (req.method === 'PATCH') {
    const { status, title, content } = req.body;
    await collection.updateOne(
      { username, 'todos._id': new ObjectId(id) },
      {
        $set: {
          'todos.$.title': title,
          'todos.$.content': content,
          'todos.$.status': status
        }
      }
    );

    return res.status(200).json({ message: 'Successful update todo' });
  }

  return res.status(400).json({ message: 'Route does not exist' });
}
