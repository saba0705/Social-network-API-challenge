const {Thought, User} = require('../models');

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
    async createThought (req, res) {
      try {
        const thought = await Thought.create(req.body);
        res.json(thought);
      } catch (err) {
        console.log(err);
        return res.status(400).json(err);
      }
    },
    // update thought
    async updateThought(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },  
          { $set: req.body },
          { runValidators: true, new: true }
        );
        if (!thought) {
          return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(thought);
      } catch (err) {
        console.log(err);
        return res.status(400).json(err);
      }
    },
    // delete thought
    async deleteThought(req, res) {
      try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
        if (!thought) {
          return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(thought);
      } catch (err) {
        console.log(err);
        return res.status(400).json(err);
      }
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

