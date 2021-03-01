const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        await res.send('Test!!!!!');
    } catch (error) {
        res.status(500).json({message : err.message});
    }
});

module.exports = router;
