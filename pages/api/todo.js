import { connectToDatabase } from '../../utils/database';
import { ObjectID } from 'mongodb';

export default async function handler(req, res) {

    const { method } = req

    let db = await connectToDatabase();

    const dataModel = {
        "_id": new ObjectID(),
        "task": "task",
        "dt_inclusao": "dt_inclusao",
        "situacao": "situacao"
    }

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
            data.date = new Date(data.date);
            if (!data._id) {
                data._id = new ObjectID();
            }
            let doc = db
                .collection("todos")
                .updateOne({ _id: data._id }, { $set: data }, { upsert: true });

            res.json({ message: "ok" });
            break
        default:
            res.status(400).json({ success: false })
            break
    }

}







// const handler = connectToDatabase();

// console.log(handler);

// handler.use(connectToDatabase);

// handler.get(async (req, res) => {

//     const dataModel = {
//         "_id": new ObjectID(),
//         "task": "task",
//         "dt_inclusao": "dt_inclusao",
//         "situacao": "situacao"
//     }

//     let doc = {}

//     doc = await req.db.collection('todos').find({}).toArray();

//     if (doc == null) {
//         doc = dataModel;
//     }

//     res.json(doc)
// })

// handler.post(async (req, res) => {
//     let data = req.body;
//     data = JSON.parse(data);
//     data.date = new Date(data.date);
//     let db = await connectToDatabase();
//     let doc = db
//       .collection("todos")
//       .updateOne({ date: new Date(data.date) }, { $set: data }, { upsert: true });

//     res.json({ message: "ok" });
//   });

// export default (req, res) => handler(req, res);