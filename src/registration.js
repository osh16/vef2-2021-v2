const express = require('express');
const validator = require('express-validator');
const db = require('./db.js');
const xss = require('xss');

const router = express.Router();

const nationalIdPattern = '^[0-9]{6}-?[0-9]{4}$';

router.get('/', async (req, res, next) => {
    const signatures = await db.getSignatures();
    res.render('index', {
        title: "Undirskriftarlisti",
        signatures: signatures
    });
});

module.exports = router;
