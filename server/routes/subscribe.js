const express = require('express');
const router = express.Router();
const { Subscriber } = require('../models/Subscriber');

router.post('/subscribeNumber', (req, res) => {
    Subscriber.find({ 'userTo' : req.body.userTo })
        .exec((err, subscribe) => {
            if(err){
                return res.status(400).send(err);
            }  
            // subscribe : 구독한 유저의 케이스 수...
            return res.status(200).json({ success: true, subscribeNumber: subscribe.length });
        });
});

router.post('/subscribed', (req, res) => {
    // userTo: 해당 동영상 업로드한 유저
    // userFrom: 현재 로그인 유저
    const { userTo , userFrom } = req.body;
    Subscriber.find({ userTo, userFrom})
        .exec((err, subscribed) => {
            if(err){
                return res.status(400).send(err);
            }
            let result = false; // false: 구독하지 않은 상태
            if(subscribed.length === 1){ // 현재 유저가 구독한 경우
                result = true;
            }
            return res.status(200).json({ success: true, subscribed: result })
            

        })


});


module.exports = router;