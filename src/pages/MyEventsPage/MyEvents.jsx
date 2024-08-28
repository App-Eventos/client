import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppProvider';
import { Button, Modal, message, List } from 'antd';
import { useNavigate } from 'react-router-dom';
import "./MyEvents.css"

const MyEvents = () => {
  const { state } = useContext(AppContext);
  const [events, setEvents] = useState([]);
  // const [editingEvent, setEditingEvent] = useState(null);
  const navigate = useNavigate(); // Para redirigir si es necesario
  const userId = state.user._id

  //conectando a la base de datos para que obtener los eventos del user
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get(`http://localhost:8080/event/createdBy/${userId}`, {
            headers: { token_user: token }
          });

          // Filtrar los eventos para mostrar solo los creados por el usuario autenticado
          // const userEvents = response.data.filter(event => event.createdBy === userId);

          setEvents(response.data);
        } else {
          message.error('No se ha encontrado el usuario.');
          navigate('/login'); // Redirige al login si no hay usuario autenticado
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        message.error('Error al obtener los eventos.');
      }
    };

    fetchEvents();
  }, []);


  const handleDeleteClick = async (eventId) => {
    Modal.confirm({
      title: '¿Estás seguro que deseas eliminar este evento?',
      onOk: async () => {
        try {
          const token = localStorage.getItem('token');
          await axios.delete(`http://localhost:8080/event/delete/${eventId}`, {
            headers: { token_user: token }
          });
          setEvents(events.filter(event => event._id !== eventId));
          message.success('Evento eliminado correctamente.');
        } catch (error) {
          console.error('Error deleting event:', error);
          message.error('Error al eliminar el evento.');
        }
      }
    });
  };

  return (
    <div className='my-events-container'>
      <h2>Mis Eventos</h2>
      <List
        itemLayout="horizontal"
        dataSource={events}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={item.title}
              description={item.description}
            />
            <Button type="primary" onClick={() => navigate(`/edit-event/${item._id}`)}>
              Editar
            </Button>
            <Button type="danger" onClick={() => handleDeleteClick(item._id)}>
              Eliminar
            </Button>
          </List.Item>
        )}
      />

      <Button type="default" className="volver-button" onClick={() => navigate("/")}>
        Volver
      </Button>
    </div>
  );
};

export default MyEvents;
