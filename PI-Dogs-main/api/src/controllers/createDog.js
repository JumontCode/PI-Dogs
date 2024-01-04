const { Dog } = require("../db");
const { v4: uuidv4 } = require('uuid');

const createDog = async (req, res) => {
  try {
    const { name, image, minHeight, maxHeight, minWeight, maxWeight, life, temperaments } = req.body;
    
    if (!name || !image || !life || !temperaments) {
      return res.status(400).json({ error: "No puede haber campos vacíos" });
    }

    const newDog = await Dog.create({
      id: uuidv4(),
      name,
      image,
      height: { min: minHeight, max: maxHeight },
      weight: { min: minWeight, max: maxWeight },
      life: `${life} years`,
    });

    // Asegúrate de que temperaments sea un array de strings.
    if (temperaments && Array.isArray(temperaments)) {
      newDog.addTemperaments(temperaments);
    } else {
      return res.status(400).json({ error: "Los temperamentos deben ser proporcionados como un array de strings" });
    }

    res.status(201).json(newDog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = createDog;