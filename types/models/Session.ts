import returnCachedModel from '@/utils/returnCachedModel';
import mongoose, { InferSchemaType } from 'mongoose';

const sessionSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: [true, "A user's id must be present"]
    },
    user_id: {
        type: String,
        required: true,
    },
    expires_at: {
        type: Date,
        required: true
    }
}, { _id: false })
export type SessionType = InferSchemaType<typeof sessionSchema>;
export default returnCachedModel('session', sessionSchema);