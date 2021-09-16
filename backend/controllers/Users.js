const { validationResult } = require('express-validator')

const mongodb = require('mongodb');
const Users = require('../models/Users');
const ObjectId = mongodb.ObjectId;

exports.getSearchUsers = (req, res, next) => {
    Users.fetchAll()
        .then(Userss => {
            res.status(200).json({
                response: {
                    data: Userss,
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

exports.postAddUsers = (req, res, next) => {
    console.log(req.body);
    const { user_name,password,favorite,history} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(500).json({
            response: {
                result: false,
                message: errors.array()
            }
        });
    } else {
        const users = new Users(user_name,password,favorite,history);
        users
            .save()
            .then(result => {
                // console.log(result);
                console.log('Created Users');
                res.status(200).json({
                    response: {
                        result: true,
                        message: "success"
                    }
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    response: {
                        result: false,
                        message: err
                    }
                });
            });
    }
};

exports.postUpdateUsers = (req, res, next) => {
    console.log(req.body);
    const { Users_id,user_name,password,favorite,history} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(500).json({
            response: {
                result: false,
                message: errors.array()
            }
        });
    } else {
        const users = new Users(user_name,password,favorite,history,  new ObjectId(Users_id));
        users
            .save()
            .then(result => {
                console.log('Update Users');
                res.status(200).json({
                    response: {
                        result: true,
                        message: "success"
                    }
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    response: {
                        result: false,
                        message: err
                    }
                });
            });
    }
};

exports.getDeleteUsers = (req, res, next) => {
    const { Users_id } = req.params;
    console.log(Users_id);
    Users.deleteById(Users_id)
        .then(() => {
            console.log('Delete Users');
            res.status(200).json({
                response: {
                    result: true,
                    message: "success"
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                response: {
                    result: false,
                    message: err
                }
            });
        });
};

exports.getUpdateUsers = (req, res, next) => {
    console.log(req.params);
    const { Users_id } = req.params;
    let user_name = '';
    let password = '';
    let favorite = '';
    let history = '';


    Users.findById(Users_id)
        .then(users => {
            console.log(users);
            res.status(200).json({
                response: {
                    data: users,
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
};