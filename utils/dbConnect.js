// import { MongoClient } from "mongodb";

// const { MONGODB_URI, MONGODB_DB } = process.env
// let cachedDb = null;

// export async function connectToDatabase() {
//   if (cachedDb) {
//     return cachedDb;
//   }
//   const client = await MongoClient.connect(MONGODB_URI, { useNewUrlParser: true });
//   const db = await client.db(MONGODB_DB);

//   cachedDb = db;
//   return db;
// }
import mongoose from "mongoose";

const { MONGODB_URI } = process.env
const connection = {};

(async function dbConnect() {
	if (connection.isConnected) {
		return;
	}

	try {
		const db = await mongoose.connect(MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});

		connection.isConnected = db.connections[0].readyState;
		
		console.log("MongoDB Connected");
	} catch (error) {
		console.log(error);
	}
})();