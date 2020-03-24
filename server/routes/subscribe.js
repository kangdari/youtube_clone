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

module.exports = router;