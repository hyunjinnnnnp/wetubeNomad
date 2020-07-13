import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
    fileUrl: {
        type: String, //파일 자체를 저장하는 게 아니라 동영상의 url을 저장할 거야
        required: 'File URL is required' //파일url값이 없는 비디오를 생성하려한다면 에러
    },
    title: {
        type: String,
        required: 'Title is required'
    },
    description: String,
    views: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment' //어느 모델에서 온 건지 명시
    }]
});
//여기까진  shape definition

const model = mongoose.model('Video', VideoSchema); //actuall document shape
export default model;