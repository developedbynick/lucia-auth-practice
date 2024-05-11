import mongoose from 'mongoose';
import User, { UserInstanceMethods } from '@/types/models/User';
import validator from 'validator';
import returnCachedModel from '@/utils/returnCachedModel';
import bcrypt from 'bcryptjs';

type userType = Omit<User, 'createdAt' | 'updatedAt'>;
const userSchema = new mongoose.Schema<userType, any, any, any, Pick<User, 'createdAt' | 'updatedAt'>>({
    _id: String,
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [30, 'Name must not exceed 30 characters'],
        lowercase: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [8, 'Password must be at least 8 characters long'],
        maxlength: [64, 'Password must not exceed 30 characters'],
        select: false,
    },

}, { _id: false, timestamps: true });

userSchema.methods.comparePasswords = async (hashedPassword: string, regPassword: string) => bcrypt.compare(regPassword, hashedPassword);

export default returnCachedModel('users', userSchema) as mongoose.Model<userType, {}, UserInstanceMethods>