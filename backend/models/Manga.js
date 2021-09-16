const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;
class Manga {
    constructor(name, writer,year,description,cover,score,view,categoryies=[100],id) {
        this.name = name;
        this.writer = writer;
        this.year = year;
        this.description = description;
        this.cover = cover;
        this.score = score;
        this.view = view;
        this.categoryies = categoryies;
        this._id = id;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            // Update the mangas
            dbOp = db
                .collection('Manga')
                .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
        } else {
            // Insert mangas
            dbOp = db.collection('Manga').insertOne(this);
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
            .collection('Manga')
            .find()
            .toArray()
            .then(Manga => {
                console.log(Manga);
                return Manga;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findById(prodId) {
        const db = getDb();
        return db
            .collection('Manga')
            .find({ _id: new mongodb.ObjectId(prodId) })
            .next()
            .then(mangas => {
                console.log(mangas);
                return mangas;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static deleteById(prodId) {
        const db = getDb();
        return db
            .collection('Manga')
            .deleteOne({ _id: new mongodb.ObjectId(prodId) })
            .then(result => {
                console.log('Deleted');
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = Manga;