const User = require('../models/User');

async function createUser(name, email, password, res) {
    const userObj = {
        'name': name,
        'email': email,
        'password': password
    };

    const user = new User(userObj);
    const exists = await User.exists({
        email: user.email
    });

    if(!exists){
        await user.save();
        return res.status(201).json({
        message:'User successfully registered!',
        _id: userObj._id,
        });
    }
    return res.status(403).json({ message:'User Already Exists! '});
}

async function findById(userId){
    const promise = await User.findOne({_id:userId}).exec();
    if(promise){
        return promise;
    }
    return null;
}

async function getUser(email){
    const userDoc = await User.findOne({
        email: email
    });

    if(userDoc){
        return userDoc;
    }
    return null;
}

async function appendToPortfolio(email, portfolioObj){
    const doc = await User.updateOne({
        email: email
    },
    {
        $push: {
            portfolio: portfolioObj
        }
    });

    if(doc){
        return true;
    }
    return false;
}

async function deleteFromPortfolio(email, portfolioID){
    const doc = await User.updateOne({
        email: email,
        "portfolio._id": portfolioID,
    },
    {
        $pull: {
            portfolio: {
                _id: portfolioID,
            }
        }
    });

    if(doc){
        return true;
    }
    return false;
}

module.exports = {
    createUser,
    getUser,
    findById,
    appendToPortfolio,
    deleteFromPortfolio,
}