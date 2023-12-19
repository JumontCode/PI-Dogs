const { Dog, Temperament } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios");

const endPoint = "https://api.thedogapi.com/v1/breeds";

// //* Controller For View Dods
const findDogsByName = async (req, res) => {
  try {
    const { name } = req.query;

    // Buscar en la base de datos local
    const dbDogs = await Dog.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: {
        model: Temperament,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    // Obtener datos de la API
    const { data } = await axios.get(endPoint);

    // Formatear y filtrar perros de la API por nombre
    const dogsFilter = 
    data.filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase())).map((dog) => ({
        created: false,
        id: dog.id,
        name: dog.name,
        image: dog.reference_image_id,
        weight: dog.weight.metric,
        height: dog.height.metric,
        life: dog.life_span,
        bredfor: dog.bred_for,
        bredgroup: dog.breed_group,
        origin: dog.origin,
        temperaments: dog.temperament,
      }));

    // Combinar resultados de la base de datos y la API
    const combinedResults = [...dbDogs, ...dogsFilter];

    // Verificar si se encontraron perros en la base de datos local o la API
    if (combinedResults.length > 0) {
      return res.status(200).json(combinedResults);
    } else {
      return res.status(404).send("Dogs not found");
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = findDogsByName;