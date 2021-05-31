import List from "../../../models/List";
import '../../../utils/dbConnect';

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const list = await List.findById(id);

        return res.status(200).json({
          success: true,
          data: list,
        });
      } catch (error) {
        return res.status(404).json({
          success: false,
        });
      }
    case "PUT":
      try {
        const mainList = await List.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        return res.status(200).json({
          success: true,
          data: list,
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
        });
      }
    case "DELETE":
      try {
        await List.deleteOne({ _id: id });

        return res.status(200).json({
          success: true,
          data: { id },
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
        });
      }
    default:
      res.setHeaders("Allow", ["GET", "PUT", "DELETE"]);
      return res
        .status(405)
        .json({ success: false })
        .end(`Method ${method} Not Allowed`);
  }
};