import "server-only"
import mongoose from 'mongoose';

if (!process.env.MONGO_URI) {
    console.log("Please provide a Mongo Database connection string");
    process.exit(1)
}
if (mongoose.connection.readyState === 0) {
    mongoose.connect(process.env.MONGO_URI).then(({ connection }) => {
        console.log(`Successfully connected to '${connection.name}' database`);
    });
}