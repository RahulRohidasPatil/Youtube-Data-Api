import Video from "../../models/Video";
import connectDb from "../../mongoose";

async function handler(req, res) {
    let videos = await Video.find();
    res.status(200).json(videos);
}

export default connectDb(handler);