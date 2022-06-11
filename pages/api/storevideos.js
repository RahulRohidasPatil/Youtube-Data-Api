import Video from "../../models/Video";
import connectDb from "../../mongoose";

const publishedAfter = new Date().toISOString();
const baseApiUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=50&order=date&q=football";

async function handler(req, res) {
    await Video.deleteMany();
    const url = `${baseApiUrl}&key=${process.env.API_KEY}&publishedAfter=${publishedAfter}`;
    const response = await fetch(url);
    const json = await response.json();
    for (let item of json.items) {
        const video = {
            title: item.snippet.title,
            description: item.snippet.description,
            channelTitle: item.snippet.channelTitle,
            publishTime: item.snippet.publishTime,
            thumbnailUrl: item.snippet.thumbnails.medium.url,
        }
        await Video.create(video);
    }
    res.status(200).json({ status: 'Videos Stored in database Successfully' });
}

export default connectDb(handler);