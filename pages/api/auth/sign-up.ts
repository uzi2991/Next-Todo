import { NextApiRequest, NextApiResponse } from 'next';
import connectToDB from '../../../src/lib/db';
import RegisterValidation from '../../../src/validations/register';
import { formatError } from '../../../src/validations/index';
import bcrypt from 'bcryptjs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(404).json({ message: 'Route does not exist' });
  }

  const { username, confirmPassword, password } = req.body;
  try {
    await RegisterValidation.validate({ username, confirmPassword, password });
  } catch (error) {
    return res.status(400).json({ message: formatError(error) });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  try {
    const db = await connectToDB();
    const collections = db.collection('users');

    const alreadyExist = await collections.findOne({ username });
    if (alreadyExist) {
      return res.status(400).json({ message: 'Username already exist' });
    }

    await collections.insertOne({
      username,
      password: hashedPassword,
      todos: []
    });

    return res.status(201).json({ message: 'Successful create new user' });
  } catch (error) {
    return res.status(500).json({ message: 'Database error' });
  }
}
