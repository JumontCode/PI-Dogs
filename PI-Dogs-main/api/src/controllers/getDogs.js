const { Dog, Temperament } = require("../db");
const axios = require("axios");

const endPoint = "https://api.thedogapi.com/v1/breeds";

const endPointImg = "https://api.thedogapi.com/v1/images/";
const apiKey =
  "live_dDKbexKCs58zds3S2vaUifLmxlb44xM0hANjsUBzfbmNcuVjNbBqKrM94h18OBHE";
//* Controller For View Dods

const dogsApi = async () => {
  try {
    const { data } = await axios(`${endPoint}/?limit=2`);
    const result = [];

    for (const dogApi of data) {
      const dogImg = await axios(`${endPointImg}${dogApi.reference_image_id}?api_key=${apiKey}`);
      
      result.push({
        created: false,
        id: dogApi.id,
        name: dogApi.name,
        image: dogImg.data.url,
        weight: dogApi.weight.metric,
        height: dogApi.height.metric,
        life: dogApi.life_span,
        bredfor: dogApi.bred_for,
        bredgroup: dogApi.breed_group,
        origin: dogApi.origin,
        temperaments: dogApi.temperament,
      });
    }

    return result;
  } catch (error) {
    console.error("Error fetching data from The Dog API", error);
    return [];
  }
};

const dogsDB = async (Dog) => {
  const data = await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  return data.map((temp) => {
    const temperament = temp.dataValues.temperaments.map((temp) => temp.name);
    return { ...temp.dataValues, temperaments: [...temperament] };
  });
};

const findAllDogs = async (req, res) => {
  const DogsDB = await dogsDB(Dog);
  const DogsApi = await dogsApi(endPoint);
  const Dogs = [...DogsApi, ...DogsDB];

  res.status(200).json(Dogs);
};
module.exports = findAllDogs;