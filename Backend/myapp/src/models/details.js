const mongoose = require('mongoose');

const Details = mongoose.model('Details', {
    age: {
        type: Number,
        required: true,
        min: [0],
        max: [150]
    },
    destination: {
        type: String,
        required: true,
    },
    faveColor: {
        type: String
    },
    quote: {
        type: String
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
})

//const Details = mongoose.model('Details', detailsSchema)

module.exports = Details