import Item from "../../../models/Item";
import '../../../utils/dbConnect';
import jwt from 'next-auth/jwt';

const secret = process.env.JWT_SECRET;

export default async (req, res) => {

    const token = await jwt.getToken({ req, secret });

    if (token) {

        const { method } = req

        let data = req.body;

        switch (method) {
            case "GET":
                try {
                    const itens = await Item.find({listId:req.query.listId}).sort({
                        createdAt: "desc",
                    });

                    return res.status(200).json({
                        success: true,
                        data: itens,
                    });
                } catch (error) {
                    return res.status(400).json({
                        success: false,
                    });
                }
            case "POST":
                
                data.createdBy = token.sub;
                
                try {
                    const itens = await Item.create(data);

                    return res.status(201).json({
                        success: true,
                        data: itens,
                    });
                } catch (error) {
                    return res.status(400).json({
                        success: false,
                    });
                }
            default:
                res.setHeaders("Allow", ["GET", "POST"]);
                return res
                    .status(405)
                    .json({ success: false })
                    .end(`Method ${method} Not Allowed`);
        }

    } else {
        return res.status(401).json({
            message: 'Unauthorized, please login first.'
        });
    }

}