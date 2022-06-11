const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: String,
    description: String,
    channelTitle: String,
    publishTime: String,
    thumbnailUrl: String
});

mongoose.models = {};
export default mongoose.model("Video", videoSchema);