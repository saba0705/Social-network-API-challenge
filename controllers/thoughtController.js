const {Thought, User} = require('../models');
const { get } = require('../routes/api');

module.exports = {
    // get all thoughts
    getThoughts(req, res) {
        Thought.find()
          .then((thoughts) => res.json(thoughts))
          .catch((err) => res.status(500).json(err));
      },
    // get single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .then((thought) => {
            if (!thought) {
              return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(thought);
          })
          .catch((err) => res.status(400).json(err));
      },

    // create thought
    createThought(req, res) {
        Thought.create(body)
          .then(({ _id }) => {
            return User.findOneAndUpdate(
              { _id: body.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
            })
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user found with this id!' });
                }
                res.json(dbUserData);
            })
            .catch((err) => res.json(err));
    },
    // update thought
         updateThought ({ params, body }, res) {
            Thought.findOneAndUpdate({ _id: params.id },
                body,
                { new: true, runValidators: true }
                )
                .then((thoughtData) => {
                    if (!thoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                    }
                    res.json(thoughtData);
                })
                .catch((err) => res.json(err));
        },
    // delete thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
          .then((thought) => {
            if (!thought) {
              return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(thought);
          })
          .catch((err) => res.status(400).json(err));
      },
    // add reaction
    addReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { new: true, runValidators: true }
        )
          .then((thought) => {
            if (!thought) {
              return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(thought);
          })
          .catch((err) => res.json(err));
      },
    // remove reaction
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { new: true }
        )
          .then((thought) => res.json(thought))
          .catch((err) => res.json(err));
      }
};

