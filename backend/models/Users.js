const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Users {
    constructor(user_name,password,favorite,history,id) {
        this.user_name = user_name;
        this.password = password;
        this.favorite = favorite;
        this.history = history;
        this._id = id;

    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            // Update the product
            dbOp = db
                .collection('Users')
                .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
        } else {
            // Insert product
            dbOp = db.collection('Users').insertOne(this);
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
            .collection('Users')
            .find()
            .toArray()
            .then(users => {
                console.log(users);
                return users;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findById(prodId) {
        const db = getDb();
        return db
            .collection('Users')
            .find({ _id : new mongodb.ObjectId(prodId) })
            .next()
            .then(users => {
                console.log(users);
                return users;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static deleteById(prodId) {
        const db = getDb();
        return db
            .collection('Users')
            .deleteOne({ _id: new mongodb.ObjectId(prodId) })
            .then(result => {
                console.log('Deleted');
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = Users;