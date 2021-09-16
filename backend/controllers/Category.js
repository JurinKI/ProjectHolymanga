const { validationResult } = require('express-validator')

const mongodb = require('mongodb');
const Category = require('../models/Category');
const ObjectId = mongodb.ObjectId;

exports.getSearchCategory = (req, res, next) => {
    Category.fetchAll()
        .then(Categorys => {
            res.status(200).json({
                response: {
                    data: Categorys,
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

exports.postAddCategory = (req, res, next) => {
    console.log(req.body);
    const { name } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(200).json({
            response: {
                result: false,
                message: errors.array()
            }
        });
    } else {
        const category = new Category(name);
        category
            .save()
            .then(result => {
                // console.log(result);
                console.log('Created Category');
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

exports.postUpdateCategory = (req, res, next) => {
    console.log(req.body);
    const { Category_id, name} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(200).json({
            response: {
                result: false,
                message: errors.array()
            }
        });
    } else {
        const category = new Category(name,  new ObjectId(Category_id));
        category
            .save()
            .then(result => {
                console.log('Update Category');
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

exports.getDeleteCategory = (req, res, next) => {
    const { Category_id } = req.params;
    console.log(Category_id);
    Category.deleteById(Category_id)
        .then(() => {
            console.log('Delete Category');
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

exports.getUpdateCategory = (req, res, next) => {
    console.log(req.params);
    const { Category_id } = req.params;
    let name = '';

    Category.findById(Category_id)
        .then(category => {
            console.log(category);
            res.status(200).json({
                response: {
                    data: category,
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