import mongoose from "mongoose";

let connected = false

const connectDB = async () => {
    mongoose.set('strictQuery', true)

    // If db is already connected, dont connect
    if (connected) {
        console.log('====================================');
        console.log("MongoDB is already connected");
        console.log('====================================');
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI || "")
        console.log('====================================');
        console.log("MongoDB connection established");
        console.log('====================================');
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
}

export default connectDB