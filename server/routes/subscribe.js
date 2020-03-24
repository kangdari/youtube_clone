const express = require('express');
const router = express.Router();
const { Subscriber } = require('../models/Subscriber');
// 해당 video를 게시한 유저를 구독한 전체 인원 수
router.post('/subscribeNumber', (req, res) => {
    Subscriber.find({ 'userTo': req.body.userTo })
        .exec((err, subscribe) => {
            if (err) {
                return res.status(400).send(err);
            }
            // subscribe : 구독한 유저의 케이스 수...
            return res.status(200).json({ success: true, subscribeNumber: subscribe.length });
        });
});
// 현재 user가 해당 video 게시자를 구독했는지 여부...
router.post('/subscribed', (req, res) => {
    // userTo: 해당 동영상 업로드한 유저
    // userFrom: 현재 로그인 유저
    const { userTo, userFrom } = req.body;
    Subscriber.find({ userTo, userFrom })
        .exec((err, subscribed) => {
            if (err) {
                return res.status(400).send(err);
            }
            let result = false; // false: 구독하지 않은 상태
            if (subscribed.length === 1) { // 현재 유저가 구독한 경우
                result = true;
            }
            return res.status(200).json({ success: true, subscribed: result })
        })
});
// 구독 취소 
router.post('/unSubscribe', (req, res) => {
    const { userTo, userFrom } = req.body;
    // DB에서 userTo와 userFrom을 찾아 삭제
    Subscriber.findOneAndDelete({ userTo, userFrom})
        .exec((err, doc) => {
            if (err) {
                return res.status(400).json({ success: false, err })
            }
            return res.status(200).json({ success: true, doc })
        });
});
// 구독하기, 구독 신청
router.post('/subscribe', (req, res) => {
    const { userTo, userFrom } = req.body;
    // DB에 userTo와 userFrom을 저장
    const subscribe = new Subscriber({userTo, userFrom}); // 인스턴스
    // DB에 저장
    subscribe.save((err, doc) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }
        return res.status(200).json({ success: true, doc });
    })
});


module.exports = router;