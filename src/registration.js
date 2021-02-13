const express = require('express');
const validator = require('express-validator');
const db = require('./db.js');
const xss = require('xss');

const router = express.Router();

const nationalIdPattern = '^[0-9]{6}-?[0-9]{4}$';

router.get('/', async (req, res, next) => {
    const signatures = await db.getSignatures();
    const errors = [];
    res.render('index', {
        title: "Undirskriftarlisti",
        signatures: signatures,
        errors: errors
    });
});

router.post('/',
validator.body('name').trim().escape(),
validator.body('name').isLength({min:1}).withMessage("Nafn má ekki vera tómt"),
validator.body('nationalId').trim().escape().isLength({min:1}).withMessage("Kennitala má ekki vera tóm"),
validator.body('nationalId').matches(new RegExp(nationalIdPattern)).withMessage("Kennitala verður að vera á formi 000000-0000 eða 0000000000"),
validator.body('comment').trim().escape(),
validator.body('comment').isLength({max:512}).withMessage("Athugasemdir geta ekki verið meira en 512 stafir"),
async (req,res,next) => {
    const {
        name,
        nationalId,
        comment,
        anonymous
    } = req.body;


    const errors = validator.validationResult(req);
    console.log(errors);

    if (errors.errors != []) {
        console.log("errors registration.js");
        console.log(errors);
        const result = await db.insertSignature(req.body);
    }
    console.log("errors outside");
    console.log(errors.errors);
    
    const signatures = await db.getSignatures();
    res.render('index', {
        title: "Undirskriftarlisti",
        signatures: signatures,
        errors: errors.errors
    });
});

module.exports = router;
