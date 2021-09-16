const { validationResult } = require('express-validator')

const mongodb = require('mongodb');
const Comment = require('../models/Comment');
const ObjectId = mongodb.ObjectId;

exports.getSearchComment = (req, res, next) => {
    Comment.fetchAll()
        .then(comments => {
            res.status(200).json({
                response: {
                    data: comments,
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

exports.postAddComment = (req, res, next) => {
    console.log(req.body);
    const { manga_id,user_id,comment,date } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(200).json({
            response: {
                result: false,
                message: errors.array()
            }
        });
    } else {
        const comments = new Comment(manga_id,user_id,comment,date);
        comments
            .save()
            .then(result => {
                // console.log(result);
                console.log('Created Comment');
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

exports.postUpdateComment = (req, res, next) => {
    console.log(req.body);
    const { Comment_id,manga_id,user_id,comment,date} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(200).json({
            response: {
                result: false,
                message: errors.array()
            }
        });
    } else {
        const comments = new Comment(manga_id,user_id,comment,date,  new ObjectId(Comment_id));
        comments
            .save()
            .then(result => {
                console.log('Update Comment');
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

exports.getDeleteComment = (req, res, next) => {
    const { Comment_id } = req.params;
    console.log(Comment_id);
    Comment.deleteById(Comment_id)
        .then(() => {
            console.log('Delete Comment');
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

exports.getUpdateComment = (req, res, next) => {
    console.log(req.params);
    const { Comment_id } = req.params;
    let manga_id = '';
    let user_id = '';
    let comment = '';
    let date = '';

    Comment.findById(Comment_id)
        .then(comment => {
            console.log(comment);
            res.status(200).json({
                response: {
                    data: comment,
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