const router = require("express").Router();
const { Unicorn } = require("./unicorn");

module.exports = router;

router.get('/', async (request, response, next) => {
    response.json(await Unicorn.findAll())
})

router.get('/:id', async (request, response, next) => {
    let id = request.params.id
    response.json(await Unicorn.findOne({ 
        where: {id: id}
    }))
})

router.post('/', async (request, response, next) => {
    let unicorn = await Unicorn.create (request.body)
    console.log (request.body) //{ name: 'Happy The Unicorn', age: 21 }
    response.json(unicorn)
})