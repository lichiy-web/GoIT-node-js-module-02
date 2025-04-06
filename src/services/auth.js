import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import { PWD_HASH_SALT } from '../constants/user.js';

export const registerUser = async newUser => {
  const user = await UsersCollection.findOne({ email: newUser.email });
  if (user) throw createHttpError(409, 'Email in use');
  const encryptedPassword = await bcrypt.hash(newUser.password, PWD_HASH_SALT);

  return await UsersCollection.create({
    ...newUser,
    password: encryptedPassword,
  });
};

export const loginUser = async credentials => {
  const user = await UsersCollection.findOne({ email: credentials.email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const isEqual = await bcrypt.compare(credentials.password, user.password); // Порівнюємо хеші паролів

  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  // далі ми доповнемо цей сервіс
};
