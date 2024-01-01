const { Dog, Temperament } = require("../db");
const axios = require("axios");

const endPoint = "https://api.thedogapi.com/v1/breeds/";

const endPointImg = "https://api.thedogapi.com/v1/images/";
const apiKey = "live_dDKbexKCs58zds3S2vaUifLmxlb44xM0hANjsUBzfbmNcuVjNbBqKrM94h18OBHE";

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
    const dogImg = await axios(`${endPointImg}${data.reference_image_id}?api_key=${apiKey}`);
      
      const dogResult = {
        created: false,
        id: data.id,
        name: data.name,
        image: dogImg.data.url,
        weight: data.weight.metric,
        height: data.height.metric,
        life: data.life_span,
        bredfor: data.bred_for,
        bredgroup: data.breed_group,
        origin: data.origin,
        temperaments: data.temperament,
      };
      res.status(200).json(dogResult);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = findDogById;