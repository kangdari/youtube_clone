const mongoose = require('mongoose');
const Schema = mongoose;

const videoSchema = mongoose.Schema({
    write: {
        // User 모델의 모든 정보를 불러옴.
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        maxlength: 30,
    },
    description: {
        type: String,
    },
    privacy: {
        type: String,
    },
    filePath: {
        type: String,
    },
    category: {
        type: String,
    },
    // 조회수
    views: {
        type: Number,
        default: 0,
    },
    duration: {
        type: String,
    },
    thumbnail: {
        type: String,
    }
    // 생성, 수정 시간 표시
}, { timestamps: true })

const Video = mongoose.model('Video', videoSchema);

module.exports = { Video };