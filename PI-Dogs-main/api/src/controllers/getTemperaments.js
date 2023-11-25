const { Temperaments } = require("../db");
const axios = require("axios");

const endPoint = "https://api.thedogapi.com/v1/breeds/?limit=125";

const findAllTemperaments = async (req, res) => {
  try {
    const { data } = await axios(endPoint);

    //* EL METODO FLATMAP CONVIERTE TODOS LOS ARREGLOS EN UN SOLO ARREGLO Y
    //* CON EL SPLIT LOS SEPARO POR COMAS
    const temperaments = data.flatMap((dog) => dog.temperament.split(", "));

    const dogTemperaments = await Promise.all(
      temperaments.map(async (temperament) => {
        const [dbTemperament] = await Temperaments.findOrCreate({
          where: { name: temperament },
          defaults: {
            name: temperament,
          },
        });
        return dbTemperament;
      })
    );
    res.status(200).json(dogTemperaments);
  } catch (error) {
    console.error("Error al buscar los temperamentos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = findAllTemperaments;
