import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar.js';

export const initMongoDB = async () => {
  try {
    const user = getEnvVar('MONGODB_USER');
    const pwd = getEnvVar('MONGODB_PASSWORD');
    const url = getEnvVar('MONGODB_URL');
    const db = getEnvVar('MONGODB_DB');

    const mongoClusterURL = `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`;

    await mongoose.connect(mongoClusterURL);
    console.log('Mongo connection successfully established!');
    // console.log(`MongoDB URL: ${mongoClusterURL}`);
  } catch (e) {
    console.log('Error while setting up mongo connection', e);
    throw e;
  }
};
