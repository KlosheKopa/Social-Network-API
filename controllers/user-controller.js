const { User } = require('../models')

module.exports = {
  // get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find().populate('thoughts');
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Could not find any users' });
    }
  },

  // get user by id
  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.userId).populate('thoughts');
      if (!user) {
        return res.status(404).json({ error: 'That user was not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // create a new user
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // update user by id
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        {
          runValidators: true,
          new: true
        }
      );

      if (!updatedUser) {
        throw Error;
      } else {
        res.status(201).json(updatedUser);
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // delete user by id
  async deleteUser(req, res) {
    try {
      await User.findOneAndDelete({ _id: req.params.userId });
      res.status(200).json('The user has been deleted');
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // add Friend to user by id
  async addFriend(req, res) {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'No user was found' });
      }
      if (user.friends.includes(req.params.friendId)) {
        return res.status(400).json({ message: 'You are already friends' });
      }

      user.friends.push(req.params.friendId);
      await user.save();

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // delete Friend
  async deleteFriend(req, res) {
    try {
      const removedFriend = await User.findByIdAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!removedFriend) {
        return res.status(404).json({ message: 'No friend was removed' });
      }
      res.status(200).json('The friend was removed from the user');
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}