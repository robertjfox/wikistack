const express = require('express')
const router = express.Router()
const { Page } = require("../models") 
const { addPage, wikiPage, main } = require("../views/index.js")


router.get('/', async (req, res) => {
    try {
        const allPages = await Page.findAll()

        console.log(allPages)

        res.send(main(allPages))
    } catch (error) {
        next (error)
    }
})

router.get('/add', (req, res) => {
    res.send(addPage())
})

router.get('/:slug', async (req, res, next) => {
    try {
        const page = await Page.findOne({
            where: {slug: req.params.slug}
        })
        res.send(wikiPage(page))
        // res.send(`this is the slug: ${req.params.slug}`)
        // res.send("hello")
    } catch (error) {
        next (error)
    }
})

router.post('/', async (req, res, next) => {
    const page = new Page({
        title: req.body.title,
        content: req.body.content
    })

    try {
        await page.save()
        // console.log(page.dataValues)
        res.redirect(`/wiki/${page.slug}`)
    } catch (error) {
        next(error)
    }
})

module.exports = router

