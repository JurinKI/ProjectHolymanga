const { validationResult } = require('express-validator')

const mongodb = require('mongodb');
const Mangas = require('../models/Manga');
const ObjectId = mongodb.ObjectId;

exports.getSearchMangas = (req, res, next) => {
    Mangas.fetchAll()
        .then(Manga => {
            res.status(200).json({
                response: {
                    data: Manga,
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

exports.postAddMangas = (req, res, next) => {
    console.log(req.body);
    // const category_id = Array[1000];
    // const categories =  category_id[1000];
    const { name, writer,year,description,cover,score,view,categories} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(200).json({
            response: {
                result: false,
                message: errors.array()
            }
        });
    } else {
        const Manga = new Mangas(name, writer,year,description,cover,score,view,categories);
        Manga
            .save()
            .then(result => {
                // console.log(result);
                console.log('Created Manga');
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

exports.postUpdateMangas = (req, res, next) => {
    console.log(req.body);
    const { Manga_id, name, writer,year,description,cover,score,view,categories=[] } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(200).json({
            response: {
                result: false,
                message: errors.array()
            }
        });
    } else {
        const Manga = new Mangas(name, writer,year,description,cover,score,view,categories=[], new ObjectId(Manga_id));
        Manga
            .save()
            .then(result => {
                console.log('Update Manga');
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

exports.getDeleteMangas = (req, res, next) => {
    const { Manga_id } = req.params;
    console.log(Manga_id);
    Mangas.deleteById(Manga_id)
        .then(() => {
            console.log('Delete Manga');
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

exports.getUpdateMangas = (req, res, next) => {
    console.log(req.params);
    const { Manga_id } = req.params;
    let name = '';
    let writer = '';
    let year = '';
    let description = '';
    let cover = '';
    let score = '';
    let view = '';
    let categories=[];

    Mangas.findById(Manga_id)
        .then(Manga => {
            console.log(Manga);
            res.status(200).json({
                response: {
                    data: Manga,
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