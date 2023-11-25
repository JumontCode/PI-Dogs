const { Dog, Temperaments } = require("../db");
const axios = require("axios");

const endPoint = "https://api.thedogapi.com/v1/breeds";
//* Controller For View Dods

const dogsApi = async (req) => {
  const { data } = await axios(`${req}/?limit=10`);

  return data.map((dog) => {
    return {
      created: false,
      id: dog.id,
      name: dog.name,
      image: dog.reference_image_id,
      weight: dog.weight,
      height: dog.height,
      life: dog.life_span,
      bredfor: dog.bred_for,
      bredgroup: dog.breed_group,
      origin: dog.origin,
    };
  });
};

const dogsDB = async (Dog) => {
    const data = await Dog.findAll({
        include:{
            model:Temperaments,
            attributes:["name"],
            through:{
                attributes:[],
            },
        },
    })

    return data.map(temp => {
        const temperaments = temp.dataValues.name((temp) => temp.name);
        return {...temp.dataValues, temperaments:[...temperaments]}
    })
};

const findAllDogs = async (req,res) => {
    const DogsDB = await dogsDB(Dog);
    const DogsApi = await dogsApi(endPoint);
    const Dogs = [...DogsApi, ...DogsDB]
    
    res.status(200).json(Dogs);
};
module.exports = findAllDogs;
