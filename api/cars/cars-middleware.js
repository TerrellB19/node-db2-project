const Cars = require('./cars-model')
const vinValidator = require('vin-validator')

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  const car = await Cars.getById(req.params.id)
  if(!car){
    return res.status(404).json({
      message: `car with id ${req.params.id} is not found`
    })
  } else{
    next()
  }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC



  if( req.body.vin === undefined){
    return res.status(400).json({
      message: "vin is missing"
    })
  } else if (req.body.make === undefined){
    return res.status(400).json({
      message: "make is missing"
    })
  } else if (req.body.model === undefined){
    return res.status(400).json({
      message: "model is missing"
    })
  } else if (req.body.mileage === undefined){
    return res.status(400).json({
      message: "mileage is missing"
    })
  } else{
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  var isValidVin = vinValidator.validate(req.body.vin)
  if(isValidVin === false){
    return res.status(400).json({
      message: `vin ${req.body.vin} is invalid`
    })
  } else{
    next()
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const exsisting = await Cars.getAll().where({vin: req.body.vin}).first()
  if(exsisting){
    return res.status(400).json({
      message: `vin ${req.body.vin} already exists`  
    })
  } else{   
    next()
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}