import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

const client = new MongoClient(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function database(req, res, next) {
    if (!client.isConnected()) await client.connect();
    req.dbClient = client;
    req.db = client.db('db-todos');
    return next();
}

const bancoDados = nextConnect();
bancoDados.use(database);

export default bancoDados;