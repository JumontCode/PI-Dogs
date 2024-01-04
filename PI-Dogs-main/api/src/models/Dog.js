// const { DataTypes } = require('sequelize');


// // Exportamos una funcion que define el modelo
// // Luego le injectamos la conexion a sequelize.
// module.exports = (sequelize) => {
//   // defino el modelo
//   sequelize.define('dog', {
//     id:{
//       type:DataTypes.STRING,
//       primaryKey: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     image: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     height:{
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     weight:{
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     life: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     created: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: true,
//     }
//   },{ timestamps: false });
// };


const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('dog', {
    id: {
      type: DataTypes.STRING,
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
    height: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    weight: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    life: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    timestamps: false,
  });};