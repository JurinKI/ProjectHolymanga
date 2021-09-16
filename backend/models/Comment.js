const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Comment {
    constructor(manga_id,user_id,comment,date,id) {
        this.manga_id = manga_id;
        this.user_id = user_id;
        this.comment = comment;
        this.date = date;
        this._id = id;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            // Update the product
            dbOp = db
                .collection('Comment')
                .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
        } else {
            // Insert product
            dbOp = db.collection('Comment').insertOne(this);
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
            .collection('Comment')
            .find()
            .toArray()
            .then(comment => {
                console.log(comment);
                return comment;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findById(prodId) {
        const db = getDb();
        return db
            .collection('Comment')
            .find({ _id : new mongodb.ObjectId(prodId) })
            .next()
            .then(comment => {
                console.log(comment);
                return comment;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static deleteById(prodId) {
        const db = getDb();
        return db
            .collection('Comment')
            .deleteOne({ _id: new mongodb.ObjectId(prodId) })
            .then(result => {
                console.log('Deleted');
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = Comment;