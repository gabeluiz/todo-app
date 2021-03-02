import nextConnect from 'next-connect';
import bancoDados from '../../utils/database';
import { ObjectID } from 'mongodb';

const handler = nextConnect();

handler.use(bancoDados);

handler.get(async (req, res) => {

    const dataModel = {
        "_id": new ObjectID(),
        "task": "task",
        "dt_inclusao": "dt_inclusao",
        "situacao": "situacao"
    }

    let doc = {}

    doc = await req.db.collection('todos').find({}).toArray();

    if (doc == null) {
        doc = dataModel;
    }

    res.json(doc)
})

handler.post(async (req, res) => {
    let data = req.body

    data = JSON.parse(data);

    if (!data._id) {
        data._id = new ObjectID();
    }

    //update espertão...
    let doc = await req.db.collection('todos').updateOne({ _id: data._id }, { $set: data }, { upsert: true });
    res.json({ message: 'ok' });
})

export default (req, res) => handler.run(req, res);