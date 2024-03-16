import mongoose, { connection } from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_CONN_URI as string)
        const conection = mongoose.connection;
        console.log(conection);
        connection.on('connected', () => {
            console.log("mongoose connected successfully");
        })

        conection.on('error', (err) => {
            console.log("Getting error while connecting to mongodb", err);
            process.exit();
        })
    } catch (error) {

        console.log(error);
    }
}

connect();