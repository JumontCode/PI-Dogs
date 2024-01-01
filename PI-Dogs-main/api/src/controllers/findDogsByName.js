// const { Dog, Temperament } = require("../db");
// const { Op } = require("sequelize");
// const axios = require("axios");

// const endPoint = "https://api.thedogapi.com/v1/breeds";

// const endPointImg = "https://api.thedogapi.com/v1/images/";
// const apiKey = "live_dDKbexKCs58zds3S2vaUifLmxlb44xM0hANjsUBzfbmNcuVjNbBqKrM94h18OBHE";


// // //* Controller For View Dods
// const findDogsByName = async (req, res) => {
//   try {
//     const { name } = req.query;

//     // Buscar en la base de datos
//     const dbDogs = await Dog.findAll({
//       where: {
//         name: {
//           [Op.iLike]: `%${name}%`,
//         },
//       },
//       include: {
//         model: Temperament,
//         attributes: ["name"],
//         through: {
//           attributes: [],
//         },
//       },
//     });


//     // Obtener datos de la API
//     const { data } = await axios.get(endPoint);

//     // Formatear y filtrar perros de la API por nombre
//     const dogsFilter =
//       data.filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase())).map((dog) => ({
//         created: false,
//         id: dog.id,
//         name: dog.name,
//         image: dogImg.data.url,
//         weight: dog.weight.metric,
//         height: dog.height.metric,
//         life: dog.life_span,
//         bredfor: dog.bred_for,
//         bredgroup: dog.breed_group,
//         origin: dog.origin,
//         temperaments: dog.temperament,
//       }));

//     // Combinar resultados de la base de datos y la API
//     const combinedResults = [...dbDogs, ...dogsFilter];

//     // Verificar si se encontraron perros en la base de datos local o la API
//     if (combinedResults.length > 0) {
//       return res.status(200).json(combinedResults);
//     } else {
//       return res.status(404).send("Dogs not found");
//     }
//   } catch (error) {
//     return res.status(500).send({ error: error.message });
//   }
// };

// module.exports = findDogsByName;



const { Dog, Temperament } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios");

const endPoint = "https://api.thedogapi.com/v1/breeds";
const endPointImg = "https://api.thedogapi.com/v1/images/";
const apiKey = "live_dDKbexKCs58zds3S2vaUifLmxlb44xM0hANjsUBzfbmNcuVjNbBqKrM94h18OBHE";

// Helper function to fetch image URL
const fetchDogImageUrl = async (imageId) => {
  const { data } = await axios(`${endPointImg}${imageId}?api_key=${apiKey}`);
  return data.url;
};

const findDogsByName = async (req, res) => {
  try {
    const { name } = req.query;

    // Buscar en la base de datos
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
    const { data: apiDogs } = await axios.get(endPoint);

    // Formatear y filtrar perros de la API por nombre
    const dogsFilter = apiDogs
      .filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase()))
      .map(async (dog) => {
        // Obtener la URL de la imagen
        const imageUrl = await fetchDogImageUrl(dog.reference_image_id);

        // Crear objeto formateado
        return {
          created: false,
          id: dog.id,
          name: dog.name,
          image: imageUrl, // Utilizar la URL de la imagen
          weight: dog.weight.metric,
          height: dog.height.metric,
          life: dog.life_span,
          bredfor: dog.bred_for,
          bredgroup: dog.breed_group,
          origin: dog.origin,
          temperaments: dog.temperament,
        };
      });

    // Esperar todas las promesas de las imágenes
    const dogsWithImages = await Promise.all(dogsFilter);

    // Combinar resultados de la base de datos y la API
    const combinedResults = [...dbDogs, ...dogsWithImages];

    // Verificar si se encontraron perros en la base de datos local o la API
    if (combinedResults.length > 0) {
      return res.status(200).json(combinedResults);
    } else {
      return res.status(404).json({ error: "Dogs not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = findDogsByName;