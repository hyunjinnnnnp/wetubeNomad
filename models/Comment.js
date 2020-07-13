import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: 'Text is required'
    },
    createdAt:{
        type: Date,
        default: Date.now
        //comment랑 video 사이에 연관관계를 어떻게 정할 것인가
        //커맨트에 비디오의 id를 저장하거나 video가 array를 가져야함
        
    }
})
const model = mongoose.model('Comment', CommentSchema);
export default model;
