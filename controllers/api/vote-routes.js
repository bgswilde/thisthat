const router = require('express').Router();
const { Vote } = require('../../models');

// get all votes
router.get('/', (req,res) => {
    Vote.findall
});