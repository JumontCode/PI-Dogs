import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { postDog } from '../../redux/actions';
import styles from './newDog.module.css';

const CreateDogForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    minHeight: '',
    maxHeight: '',
    minWeight: '',
    maxWeight: '',
    life: '',
    temperaments: [],
  });

  const [allTemperaments, setAllTemperaments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchTemperaments = async () => {
      try {
        const response = await axios.get('http://localhost:3001/temperaments');
        setAllTemperaments(response.data);
      } catch (error) {
        console.error('Error al obtener los temperamentos:', error.message);
      }
    };

    fetchTemperaments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTemperamentChange = (e) => {
    const { value, checked } = e.target;
    
    if (checked) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        temperaments: [...prevFormData.temperaments, value],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        temperaments: prevFormData.temperaments.filter((temp) => temp !== value),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/dogs', formData);
      console.log('Nuevo perro creado:', response.data);

      // Despachar la acción para actualizar el estado de Redux
      dispatch(postDog(response.data));

      setFormData({
        name: '',
        image: '',
        minHeight: '',
        maxHeight: '',
        minWeight: '',
        maxWeight: '',
        life: '',
        temperaments: [],
      });
    } catch (error) {
      console.error('Error al crear el perro:', error.message);
    }
  };

  // Calcular las temperamentos que deben mostrarse en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTemperaments = allTemperaments.slice(indexOfFirstItem, indexOfLastItem);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(allTemperaments.length / itemsPerPage);

  // Cambiar a la página siguiente
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles['create-dog-container']}>
      <h2>Crear Nueva Raza de Perro</h2>
      <form className={styles['create-dog-form']} onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Imagen:</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
        />

        <label>Altura (Mínima):</label>
        <input
          type="text"
          name="minHeight"
          value={formData.minHeight}
          onChange={handleChange}
        />

        <label>Altura (Máxima):</label>
        <input
          type="text"
          name="maxHeight"
          value={formData.maxHeight}
          onChange={handleChange}
        />

        <label>Peso (Mínimo):</label>
        <input
          type="text"
          name="minWeight"
          value={formData.minWeight}
          onChange={handleChange}
        />

        <label>Peso (Máximo):</label>
        <input
          type="text"
          name="maxWeight"
          value={formData.maxWeight}
          onChange={handleChange}
        />

        <label>Años de Vida:</label>
        <input
          type="text"
          name="life"
          value={formData.life}
          onChange={handleChange}
          required
        />

        <label>Temperamentos:</label>
        {currentTemperaments.map((temperament) => (
          <div key={temperament.id}>
            <input
              type="checkbox"
              name="temperaments"
              value={temperament.name}
              checked={formData.temperaments.includes(temperament.name)}
              onChange={handleTemperamentChange}
            />
            <label>{temperament.name}</label>
          </div>
        ))}

        {/* Mostrar la paginación */}
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>

        <button type="submit">Crear Raza</button>
      </form>
    </div>
  );
};

export default CreateDogForm;