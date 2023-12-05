const { Dog } = require("../db");

const createDog = async (req, res) => {
  try {
    let { name, image, height, weight, life, temperaments } = req.body;
    
    if (!name || !image || !life || !temperaments) {
        res.status(400).send("No puede haber campos vacios!");
    }
    
    const newDog = await Dog.create({ name, image, height, weight, life: life + ' years'});

    newDog.addTemperaments(temperaments);
    
    res.status(201).json(newDog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = createDog;
