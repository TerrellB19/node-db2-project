const { 
    checkCarId, 
    checkCarPayload, 
    checkVinNumberValid, 
    checkVinNumberUnique } = require('./cars-middleware')

const Cars = require('./cars-model')   

const router = require('express').Router()

router.get('/', async (req, res, next) => {
const allCars = await Cars.getAll() || []
    res.status(200).json(allCars)
})

router.get('/:id', checkCarId, async (req, res, next) => {
    const carById = await Cars.getById(req.params.id)
    res.status(200).json(carById)
})

router.post('/', checkCarPayload, checkVinNumberUnique, checkVinNumberValid, async (req, res, next) => {
    try {
        const newCar = await Cars.create(req.body)

    res.status(201).json(newCar)
    } catch (err){
        next(err)
    }
    
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
    })
  })

module.exports = router
