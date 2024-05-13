import mongoose, { HydratedDocument, SchemaDefinitionProperty } from 'mongoose';
import User, { UserInstanceMethods } from '@/types/models/User';
import validator from 'validator';
import returnCachedModel from '@/utils/returnCachedModel';
import bcrypt from 'bcryptjs';

type userType = Omit<User, 'createdAt' | 'updatedAt'>;
type MongooseModelType = mongoose.Model<userType, {}, UserInstanceMethods>;

const userSchema = new mongoose.Schema<userType, MongooseModelType, any, any, Pick<User, 'createdAt' | 'updatedAt'>>({
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
        required: [function () {
            return !Boolean(this.providerId);
        }, 'Please provide a password'],
        minlength: [8, 'Password must be at least 8 characters long'],
        maxlength: [64, 'Password must not exceed 30 characters'],
        select: false,
    },
    provider: {
        type: String,
        required: [function () {
            return Boolean(this.providerId);
        }, "A provider id must have a provider"],
        enum: {
            values: ["Google", "Twitter(X)", "Github"],
            message: "{VALUE} is not an accepted provider"
        },
        lowercase: true,
    },
    providerId: { type: String, unique: true }

}, { _id: false, timestamps: true });

export type HydratedUser = HydratedDocument<userType>;

userSchema.methods.comparePasswords = async (hashedPassword: string, regPassword: string) => bcrypt.compare(regPassword, hashedPassword);

export default returnCachedModel('users', userSchema) as MongooseModelType;