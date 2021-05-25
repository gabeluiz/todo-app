import { connectToDatabase } from '../utils/database';
import jwt from 'next-auth/jwt';


export async function db() {
    let db = await connectToDatabase();
    
    return db;
}

export async function getListAndTasks(slug) {

    const lists = await db().collection('lists').findOne({ _id: slug }).toArray();

    return lists;
}

export async function getAllListsWithSlug() {

    const lists = await db().collection('lists').find().toArray();

    return lists;
}