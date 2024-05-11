import mongoose, { InferSchemaType } from 'mongoose';

export default <U extends mongoose.Schema>(collectionName: string, collectionSchema: U) => {
    return (mongoose.models[collectionName] as mongoose.Model<InferSchemaType<typeof collectionSchema>> || mongoose.model(collectionName, collectionSchema));
}