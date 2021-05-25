import { connectToDatabase } from '../../utils/database';
import { ObjectID } from 'mongodb';
import jwt from 'next-auth/jwt';

const secret = process.env.JWT_SECRET;

export default async function handler(req, res) {

    const token = await jwt.getToken({ req, secret });

    if (token) {

        const { method } = req

        let db = await connectToDatabase();
        
        switch (method) {
            case 'GET':
                try {

                    const lists = await db.collection('list-item').find({list_id:req.query.list_id}).toArray(); 
                    res.status(200).json({
                        success: true,
                        data: lists
                    })
                } catch (error) {
                    res.status(400).json({ success: false })
                }
                break
            case 'POST':
                let data = req.body;
                data = JSON.parse(data);

                if (!data._id) {
                    data.dt_created = new Date();
                    data.created_by = token.name;
                    data.created_by_id = token.sub;
                    data._id = new ObjectID();
                } else {
                    data._id = ObjectID(data._id);
                    data.dt_altereted = new Date();
                    data.altereted_by = token.name;
                    data.altereted_by_id = token.sub;
                }

                let doc = await db
                    .collection("list-item")
                    .updateOne({ _id: data._id }, { $set: data }, { upsert: true });

                res.json({ message: "ok" });
                break
            case 'DELETE':
                let id = req.body;
                id = JSON.parse(id);

                let del = await db.collection('list-item').deleteOne({ _id: new ObjectID(id) });
                res.json({ message: "ok" });
                break
            default:
                res.status(400).json({ success: false })
                break
        }

    } else {
        return res.status(401).json({
            message: 'Unauthorized, please login first.'
        });
    }

}