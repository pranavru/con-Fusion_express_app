const express = require('express');
const bodyParser = require('body-parser');
var authenticate = require('../authenticate');

const Promotions = require('../models/promotions')

const promotionRouter = express.Router();

promotionRouter.use(bodyParser.json());

promotionRouter.route('/')
    .get((req, res, next) => {
        Promotions.find({})
            .then((promotions) => {
                res.statusCode = 200;
                res.setHeader('content-type', 'application/json');
                res.json(promotions)
            },
                err => next(err)).catch(err => next(err));
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promotions.create(req.body)
            .then((promotion) => {
                console.log('Promotion Created:\n', promotion);
                res.statusCode = 200;
                res.setHeader('content-type', 'application/json');
                res.json(promotion)
            },
                err => next(err)).catch(err => next(err));
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT Operation not supported on /promotions');
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promotions.remove({})
            .then(promo => {
                res.statusCode = 200;
                res.setHeader('content-type', 'application/json');
                res.json(promo);
            },
                err => next(err)).catch(err => next(err));
    });

promotionRouter.route('/:promoId')
    .get((req, res, next) => {
        Promotions.findById(req.params.promoId)
            .then((promo) => {
                res.statusCode = 200;
                res.setHeader('content-type', 'application/json');
                res.json(promo);
            },
                err => next(err)).catch(err => next(err));
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operationnot supported on /promotions/' + req.params.promoId);
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promotions.findByIdAndUpdate(req.params.promoId, {
            $set: req.body
        }, { new: true })
            .then(promotion => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(promotion);
            },
                err => next(err)).catch(err => next(err))
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promotions.findByIdAndDelete(req.params.promoId)
            .then(promotion => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(promotion);
            }, err => next(err).catch(err => next(err)));
    });

module.exports = promotionRouter;