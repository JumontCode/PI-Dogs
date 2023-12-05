const { Dog, Temperament } = require("../db");
const axios = require("axios");

const endPoint = "https://api.thedogapi.com/v1/breeds/";

const findDogById = async (req, res) => {
  const { id } = req.params;
  try {
    if(!Number(id)){
        const findDB = await Dog.findByPk(id, {
            include: {
              model: Temperament,
              attributes: ["name"],
              through: {
                attributes: [],
              },
            },
          });
          if (findDB) {
            return res.status(200).json(findDB.dataValues);
          }
    }
    const { data } = await axios(`${endPoint}${id}`);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = findDogById;