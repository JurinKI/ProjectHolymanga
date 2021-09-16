const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Episode {
    constructor(manga_ep,manga_id,id) {
        this.manga_ep = manga_ep;
        this.manga_id = manga_id;
        this._id = id;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            // Update the product
            dbOp = db
                .collection('Episode')
                .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
        } else {
            // Insert product
            dbOp = db.collection('Episode').insertOne(this);
        }
        return dbOp
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }

    static fetchAll() {
        const db = getDb();
        return db
            .collection('Episode')
            .find()
            .toArray()
            .then(episode => {
                console.log(episode);
                return episode;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findById(prodId) {
        const db = getDb();
        return db
            .collection('Episode')
            .find({ _id : new mongodb.ObjectId(prodId) })
            .next()
            .then(Episode => {
                console.log(Episode);
                return Episode;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static deleteById(prodId) {
        const db = getDb();
        return db
            .collection('Episode')
            .deleteOne({ _id: new mongodb.ObjectId(prodId) })
            .then(result => {
                console.log('Deleted');
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = Episode;