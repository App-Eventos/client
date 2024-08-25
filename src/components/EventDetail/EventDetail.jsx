import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button } from 'antd';
import './EventDetail.css'
import moment from 'moment';


const EventDetail = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (eventId) {
      axios.get(`http://localhost:8080/event/${eventId}`)
        .then(response => {
          setEvent(response.data);
        })
        .catch(error => {
          console.error('Error fetching event details:', error);
          setError(error.response?.data?.message || 'Error al obtener los detalles del evento');
        });
    } else {
      setError('Event ID is missing');
    }
  }, [eventId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <Card title={event.title} className="event-detail-card">
      <p><strong>Descripción:</strong> {event.description}</p>
      <p><strong>Fecha y hora de inicio:</strong> {moment(event.start).format('YYYY-MM-DD HH:mm')} </p>
      <p><strong>Fecha y hora de fin:</strong> {moment(event.end).format('YYYY-MM-DD HH:mm')} </p>
      <p><strong>Acceso:</strong> {event.access}</p> //cambiar para solo muestre el valor de la restriccion
      <p><strong>Precio:</strong> {event.price}</p>
      <p><strong>Restricción:</strong> {event.restriction} </p> //cambiar para solo muestre el valor de la restriccion
      <p><strong>Ubicación:</strong> {event.address}</p>
      <p><strong>Contacto:</strong> {event.phoneContact}</p>
      {event.imageUrl && <img src={`http://localhost:8080/uploads/${event.imageUrl}`} alt={event.title} />}

      <Button onClick={() => navigate(-1)}>Volver</Button>
    </Card>
  );
};

export default EventDetail;