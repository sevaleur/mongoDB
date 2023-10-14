const People = require('../models/people.model')

const express = require('express')
const router = express.Router()

const formData = require('express-form-data')
router.use(formData.parse())

// GET til endpoint people 
router.get('/', async(req, res) => 
{
    try 
    {
        let people = await People.find()
        return res.status(200).json(people)
    }
    catch(error)
    {
        return res.status(400).json({message: 'der er sket en fejl: ' + error.message})
    }
})

// GET BY ID til endpoint people 
router.get('/:id', async(req, res) => 
{
    try 
    {
        let people = await People.findById(req.params.id)

        if(people === null) return res.status(404).json({message: 'data kunne ikke findes'})

        return res.status(200).json(people) 
    } 
    catch(error) 
    {
        return res.status(400).json({message: 'der er sket en fejl: ' + error.message})
    }
})

// POST
router.post('/', async(req, res) => 
{
    try 
    {
        let people = new People(req.body)
        await people.save()
        return res.status(201).json({message: 'er oprettet', created: people})    
    } 
    catch(error) 
    {
        return res.status(400).json({message: 'der er sket en fejl: ' + error.message})
    }
})

// PUT
router.put('/:id', async(req, res) => 
{
    try 
    {
        let people = await People.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})

        if(people === null) return res.status(404).json({message: 'Data kunne ikke findes / rettes'})

        return res.status(201).json({message: 'er rettet', updated: people})
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
        let people = await People.findByIdAndDelete(req.params.id)

        if(people === null) return res.status(404).json({message: 'Data kunne ikke findes / slettes'})

        return res.status(200).json({message: people + ' er slettet'})
    } 
    catch (error)
    {
        return res.status(400).json({message: 'der er sket en fejl: ' + error.message})
    }
})

module.exports = router