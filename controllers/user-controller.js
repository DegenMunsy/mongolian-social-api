const User = require('../models/Users')

module.exports = {
    //get all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    //get one user
    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with that ID found" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    //create one user
    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err))
            
    },

    //update one user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with that ID found" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err))
    },
    //delete one user
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with that ID found" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err))
    },

    // add a friend to user
    addFriend({params}, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with that ID found" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // delete friend from user
    deleteFriend({params}, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId  } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with that ID found" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err))
    }
}