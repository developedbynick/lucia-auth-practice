import returnCachedModel from '@/utils/returnCachedModel';
import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    _id: String,
    user_id: {
        type: String,
        required: [true, "A session must have an associated user id"]
    },
    expires_at: {
        type: Date,
        required: [true, "A session must have an associated expiry date"]
    }
}, { _id: false });

export default returnCachedModel("sessions", sessionSchema)