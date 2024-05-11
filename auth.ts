import { Lucia, TimeSpan } from 'lucia'
import { MongodbAdapter } from '@lucia-auth/adapter-mongodb';
import mongoose from 'mongoose';
import User from './types/models/User';

const adapter = new MongodbAdapter(mongoose.connection.collection('sessions'), mongoose.connection.collection('users'))


export const lucia = new Lucia(adapter, {
    sessionExpiresIn: new TimeSpan(60, 'd'),
    sessionCookie: {
        name: 'SessionID',
        expires: true,
        attributes: {
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
        }
    },
    getUserAttributes: (attributes) => {
        const returnObj: Omit<User, 'password' | '_id'> = {
            name: attributes.name,
            email: attributes.email,
            createdAt: attributes.createdAt,
            updatedAt: attributes.updatedAt,
        }

        return returnObj;
    },
});

