// import { connectToDatabase } from '../../../utils/database';
// import { ObjectId } from 'mongodb';
// import jwt from 'next-auth/jwt';



// //PRECISA ALTERAR PARA ITEM NÂO LISTA!!!!!!


// const secret = process.env.JWT_SECRET;

// export default async function userHandler(req, res) {

//   const { query: { id, name }, method, } = req

//   const token = await jwt.getToken({ req, secret });

//   if (token) {

//     let db = await connectToDatabase();

//     switch (method) {
//       case 'GET':
        
//         const list = await db.collection('lists').findOne({"_id" : ObjectId(id)});

//         res.status(200).json({ data: list })
//         break
//       default:
//         res.setHeader('Allow', ['GET', 'PUT'])
//         res.status(405).end(`Method ${method} Not Allowed`)
//     }
//   }
// }