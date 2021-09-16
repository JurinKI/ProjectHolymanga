const { validationResult } = require('express-validator')

const mongodb = require('mongodb');
const History = require('../models/History')
const ObjectId = mongodb.ObjectId;
var mongoose = require('mongoose');


exports.getSearchHistory = (req, res, next) => {
    console.log("fuck u")
    History.fetchAll()
        .then(Historys => {
            res.status(200).json({
                response: {
                    data: Historys,
                    message: "success"
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                response: {
                    data: [],
                    message: err
                }
            });
        });
}

exports.postAddHistory = (req, res, next) => {
    // console.log(req.body);
    const { user_id,history } = req.body;
    const errors = validationResult(req);
    console.log("historysssss",history[0].manga_id);
    var u_id = mongoose.Types.ObjectId(user_id);
    var h_id = mongoose.Types.ObjectId(history[0].manga_id);
    history[0].manga_id = mongoose.Types.ObjectId(history[0].manga_id);
   
    if (!errors.isEmpty()) {
        console.log("if");
        res.status(200).json({
            response: {
                result: false,
                message: errors.array()
            }
        });
    } else {
        // const historys = new History(u_id,history);
        const historys = new History(u_id, history)
        historys
            .save()
            .then(result => {
                // console.log(result);
                // console.log(result);
                console.log('Created History');
                res.status(200).json({
                    response: {
                        result: true,
                        message: "success"
                    }
                });
            })
            .catch(err => {
                console.log(err);
                res.status(200).json({
                    response: {
                        result: false,
                        message: err
                    }
                });
            });
    }
};

exports.postUpdateHistory = (req, res, next) => {
    console.log(req.body);
    const { History_id, user_id,history} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(200).json({
            response: {
                result: false,
                message: errors.array()
            }
        });
    } else {
        const historys = new History(user_id,history,  new ObjectId(History_id));
        historys
            .save()
            .then(result => {
                console.log('Update History');
                res.status(200).json({
                    response: {
                        result: true,
                        message: "success"
                    }
                });
            })
            .catch(err => {
                console.log(err);
                res.status(200).json({
                    response: {
                        result: false,
                        message: err
                    }
                });
            });
    }
};

exports.getDeleteHistory = (req, res, next) => {
    const { History_id } = req.params;
    console.log(History_id);
    History.deleteById(History_id)
        .then(() => {
            console.log('Delete History');
            res.status(200).json({
                response: {
                    result: true,
                    message: "success"
                }
            });
        })
        .catch(err => {
            res.status(200).json({
                response: {
                    result: false,
                    message: err
                }
            });
        });
};

exports.getUpdateHistory = (req, res, next) => {
    console.log(req.params);
    const { History_id } = req.params;
    let user_id = '';
    let history = '';

    History.findById(History_id)
        .then(history => {
            console.log(history);
            res.status(200).json({
                response: {
                    data: history,
                    message: "success"
                }
            });
        })
        .catch(err => {
            res.status(200).json({
                response: {
                    data: [],
                    message: err
                }
            });
        });
};