const Product = require('../models/product.model')

const express = require('express')
const router = express.Router()

// multer til håndtering af filer
const multer = require('multer')
const upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'public/images')
        },
        filename: function(req, file, cb) {
            cb(null, file.originalname)
        }
    })
})

// GET til endpoint product
router.get('/', async(req, res) => 
{
    try 
    {
        let products = await Product.find()
        return res.status(200).json(products)
    }
    catch(error)
    {
        return res.status(400).json({message: 'der er sket en fejl: ' + error.message})
    }
})

// GET BY ID til endpoint product 
router.get('/:id', async(req, res) => 
{
    try 
    {
        let product = await Product.findById(req.params.id)

        if(product === null) return res.status(404).json({message: 'data kunne ikke findes'})

        return res.status(200).json(product) 
    } 
    catch(error) 
    {
        return res.status(400).json({message: 'der er sket en fejl: ' + error.message})
    }
})

// POST
router.post('/', upload.single('image'), async(req, res) => 
{
    try 
    {
        let product = new Product(req.body)
        product.image = req.file.filename

        await product.save()
        return res.status(201).json({message: 'er oprettet', created: product})    
    } 
    catch(error) 
    {
        return res.status(400).json({message: 'der er sket en fejl: ' + error.message})
    }
})

// PUT
router.put('/:id', upload.single('image'), async(req, res) => 
{
    try 
    {
        if(req.file)
        {
            req.body.image = req.file.filename
        }
        else 
        {
            let p = await Product.findById(req.params.id)
            req.body.image = p.image 
        }
        
        let product = await Product.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})

        if(product === null) return res.status(404).json({message: 'Data kunne ikke findes / rettes'})

        return res.status(201).json({message: 'er rettet', updated: product})
    } 
    catch(error) 
    {
        return res.status(400).json({message: 'der er sket en fejl: ' + error.message})
    }
})

// DELETE
router.delete('/:id', async(req, res) => 
{
    try 
    {
        let product = await Product.findByIdAndDelete(req.params.id)

        if(product === null) return res.status(404).json({message: 'Data kunne ikke findes / slettes'})

        return res.status(200).json({message: product + ' er slettet'})
    } 
    catch (error)
    {
        return res.status(400).json({message: 'der er sket en fejl: ' + error.message})
    }
})

module.exports = router