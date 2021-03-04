import { connectToDatabase } from '../../utils/database';
import { ObjectID } from 'mongodb';

export default async function handler(req, res) {

    const { method } = req

    let db = await connectToDatabase();

    switch (method) {
        case 'GET':
            try {
                const todos = await db.collection('todos').find({}).toArray(); /* find all the data in our database */
                res.status(200).json({ success: true, data: todos })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'POST':
            let data = req.body;
            data = JSON.parse(data);
            data.dt_inclusao = new Date(data.date);

            if (!data._id) {
                data._id = new ObjectID();
            }
            let doc = await db
                .collection("todos")
                .updateOne({ _id: data._id }, { $set: data }, { upsert: true });

            res.json({ message: "ok" });
            break
        case 'DELETE':
            let id = req.body;
            id = JSON.parse(id);
            
            let del = await db.collection('todos').deleteOne({ _id: new ObjectID(id) });
            res.json({ message: "ok" });
            break
        default:
            res.status(400).json({ success: false })
            break
    }

}