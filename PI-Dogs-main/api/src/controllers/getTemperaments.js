const { Temperament } = require("../db");
const axios = require("axios");

const endPoint = "https://api.thedogapi.com/v1/breeds/?limit=125";

const findAllTemperaments = async (req, res) => {
  try {
    const { data } = await axios(endPoint);

    //* EL METODO FLATMAP CONVIERTE TODOS LOS ARREGLOS EN UN SOLO ARREGLO Y
    //* CON EL SPLIT LOS SEPARO POR COMAS
    const temperaments = data.flatMap((dog) => dog.temperament.split(", "));
    
    //*FILTRO LOS TEMPERAMENTOS PARA QUE NO REPITAN
    const tempFilter = temperaments.reduce((result, index) => {
        if (result.indexOf(index) === -1) {
          result.push(index);
        }
        return result;
      }, []);

    const dogTemperaments = await Promise.all(
      tempFilter.map(async (temperament) => {
        const [dbTemperament] = await Temperament.findOrCreate({
          where: { name: temperament },
          defaults: {
            name: temperament,
          },
        });
        return dbTemperament.dataValues;
      })
    );
    res.status(200).json(dogTemperaments);
  } catch (error) {
    console.error("Error al buscar los temperamentos:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = findAllTemperaments;
