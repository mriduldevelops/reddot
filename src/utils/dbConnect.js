import mongoose from "mongoose";

const connection = {}

const dbConnect = async () => {
    if (connection.isConnected) {
        console.log("Already connected to database")
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "", {})

        connection.isConnected = db.connections[0].readyState
        console.log("Database connected successfully")

    } catch (error) {
        console.log("Database connection failed!", error)
        process.exit(1)
    }
}

export default dbConnect;