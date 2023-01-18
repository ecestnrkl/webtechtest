const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth.js');
const Users = require('../models/users.js');
const jwt = require('jsonwebtoken');
require("dotenv").config();


router.post('/', async (req, res) => {
  const users = new Users(req.body)
  try {
    const token = await users.generateAuthToken()
    res.status(201).send({ users, token })
  } catch (err) {
    res.status(400).send({ message: err.message })
  }
})


router.post('/login', async (req, res) => {
  try {
    const users = await Users.findByCredentials(req.body.email, req.body.password);
    if (!users) {
      return res.status(401).send({ error: 'Ups, Login failed!' });
    }
    const token = await users.generateAuthToken();
    res.send({ users, token });
  } catch (error) {
    res.status(400).send({ message: err.message });
  }
});

router.get('/logout', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save();
    res.status(200).send(req.user)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.get('/', async function (req, res) {
  Users.find({}, function (err, users) {
    if (err) {
      res.status(404).send(err.message);
      next();
    } else {
      res.status(200).json(users);
    }
  });
});

router.get('/:id', getUsers, (req, res) => {
  res.send(200).json(res.users)
})

async function getUsers(req, res, next) {
  let users
  try {
    users = await Users.findById(req.params.id)
    if (users == null) {
      return res.status(404).json({ message: 'Cannot find users' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.users = users
  next()
}

router.patch('/usersettings', auth, async (req, res) => {
  const allowedUpdates = ['name','age','password']
  const keys = Object.keys(req.body)
  const isUpdationValid = keys.every(key => allowedUpdates.includes(key))
  if(!isUpdationValid)
   res.status(400).send()
  try {
      keys.forEach(update => req.users[update] = req.body[update])
      await req.users.save();
      res.status(200).send(req.users)
  } catch (e) {
      res.status(400).send()
  }
})

router.delete('/users/me', auth,async (req, res) => {
  try {
      await req.user.remove();
      res.status(200).send()
  } catch (e) {
      res.status(400).send()
  }
})


module.exports = router