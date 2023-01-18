const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
const Details = require('../models/details.js')


router.post('/', auth, async function (req, res) {
    const details = new Details({...req.body, owner:req.users._id})
    try {
        await details.save()
        res.status(201).send({details});
    } catch(err) {
        res.status(400).send(err.message);
    }
});

router.get('/', async function (req, res) {
    Details.find({}, function (err, details) {
        if (err) {
            res.status(404).send(err.message);
            next();
        } else {
            res.status(200).json(details);
        }
    });
});

router.get('/:id', getDetails, (req, res) => {
    res.send(200).json(res.details)
})

async function getDetails(req, res, next) {
    let details
    try {
        details = await Details.findById(req.params.id)
        if (details == null) {
            return res.status(404).json({ message: 'Cannot find details' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.details = details
    next()
}

router.patch('/:id', getDetails, async (req, res) => {
    if (req.body.age != null) {
      res.details.age = req.body.age
    }
    if (req.body.destination != null) {
      res.details.destination = req.body.destination
    }
    try {
      const updatedDetails = await res.details.save()
      res.json(updatedDetails)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

// Deleting One
router.delete('/:id', getDetails, async (req, res) => {
    try {
      await res.details.remove()
      res.json({ message: 'Details are removed' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

module.exports = router