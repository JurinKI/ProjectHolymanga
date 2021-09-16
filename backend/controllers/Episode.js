const { validationResult } = require('express-validator')

const mongodb = require('mongodb');
const Episode = require('../models/Episode');
const ObjectId = mongodb.ObjectId;

exports.getSearchEpisode = (req, res, next) => {
    Episode.fetchAll()
        .then(Episodes => {
            res.status(200).json({
                response: {
                    data: Episodes,
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

exports.postAddEpisode = (req, res, next) => {
    console.log(req.body);
    const { manga_ep,manga_id } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(200).json({
            response: {
                result: false,
                message: errors.array()
            }
        });
    } else {
        const episode = new Episode(manga_ep,manga_id);
        episode
            .save()
            .then(result => {
                // console.log(result);
                console.log('Created Episode');
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

exports.postUpdateEpisode = (req, res, next) => {
    console.log(req.body);
    const { Episode_id, manga_ep,manga_id} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(200).json({
            response: {
                result: false,
                message: errors.array()
            }
        });
    } else {
        const episode = new Episode(manga_ep,manga_id,  new ObjectId(Episode_id));
        episode
            .save()
            .then(result => {
                console.log('Update Episode');
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

exports.getDeleteEpisode = (req, res, next) => {
    const { Episode_id } = req.params;
    console.log(Episode_id);
    Episode.deleteById(Episode_id)
        .then(() => {
            console.log('Delete Episode');
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

exports.getUpdateEpisode = (req, res, next) => {
    console.log(req.params);
    const { Episode_id } = req.params;
    let manga_ep = '';
    let manga_id = '';

    Episode.findById(Episode_id)
        .then(episode => {
            console.log(episode);
            res.status(200).json({
                response: {
                    data: episode,
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