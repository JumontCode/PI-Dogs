const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      type:DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height:{
      type: DataTypes.STRING,
      allowNull: false
    },
    weight:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    life: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  },{ timestamps: false });
};
