const express = require('express')
const router = express.Router()
const axios = require('axios')
const auth = require('../middleware/auth')
const { body, validationResult } = require('express-validator');

const Diploma = require('../models/Diploma')
const CreditsTags = require('../models/CreditsTags')


router.get('/' , async (req, res) => {
    try{ 
        const diplomas = await Diploma.find()
        const credits = await CreditsTags.findOne({type: "credits"})
        const tags = await CreditsTags.findOne({type: "tags"})

        res.json({diplomas: diplomas, credits: credits.list, tags: tags.list})  

    } catch(err) {
        res.json(err)
    }
})

router.put('/diploma-edit/:diplomaname', auth(), async(req, res) => {
    try {
        const {requester} = res.locals
        if (requester.role !== "teacher") {
            return res.send("non teacher user")
        }

        const form = req.body
        const diploma = await Diploma.findOne({name: req.params.diplomaname})
        
        Object.assign(diploma, form)
        diploma.save()
        res.send(diploma)
        
    } catch (err) {
        res.send(err)
    }
})

router.put('/list-edit/:type', auth(), async(req, res) => {
    try {
        const {requester} = res.locals
        if (requester.role !== "teacher") {
            return res.send("non teacher user")
        }

        const form = req.body
        const typelist = await CreditsTags.findOne({type: req.params.type})
        console.log(form)

        typelist.list = null
        typelist.list = form

        typelist.save()
        res.send(typelist)
        
    } catch (err) {
        res.send(err)
    }
})







module.exports = router;