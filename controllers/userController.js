const {User, Thought} = require('../models');
const { get } = require('../routes/api');

module.exports = {
    getUsers (req, res) {
        User.find()
          .then((users) => res.json(users))
          .catch((err) => res.status(500).json(err));
      },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
          .then((user) => {
            if (!user) {
              return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(user);
          })
          .catch((err) => res.status(400).json(err));
      },
    createUser(req, res) {
        User.create(body)
          .then((user) => res.json(user))
          .catch((err) => res.status(400).json(err));
      },
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id },
            body,
            { new: true, runValidators: true }
            )
            .then((userData) => {
                if (!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
                }
                res.json(userData);
            })
            .catch((err) => res.json(err));
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((user) => {
            if (!user) {
              return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(user);
          })
          .catch((err) => res.status(400).json(err));
      },
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: req.params.friendId } },
            { new: true }
          )
            .then((userData) => {
              if (!userData) {
                return res.status(404).json({ message: 'No user found with this id!' });
              }
              res.json(userData);
            })
            .catch((err) => res.json(err));
        },
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
          )
            .then((userData) => res.json(userData))
            .catch((err) => res.json(err));
        }
    };
