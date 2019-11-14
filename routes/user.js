const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('how ya doin')
    res.send('hello peace')
})

// router.post('/', (req, res) => {
    
// })

module.exports = router