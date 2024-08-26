import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button } from 'antd';
import './EventDetail.css'
import moment from 'moment';
import './EventDetail.css'

const EventDetail = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Para cambiar los valores de restricción a etiquetas más legibles.
  const restrictionLabels = {
    mayores18: "Solo mayores de 18 años",
    mayores16: "Solo mayores de 16 años",
    no_ninos: "No se admiten niños",
    no_mascotas: "No apto para mascotas",
    todo_publico: "Apto para todo público",
  };

  // Para cambiar los valores de acceso a etiquetas más legibles.
  const accessLabels = {
    libre: "Libre",
    privado: "Privado"
  };

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

  // Convierte el valor de event.restriction o event.access a una forma legible utilizando el mapeo. Si no encuentra el valor, muestra el valor original.
  const readableRestriction = restrictionLabels[event.restriction] || event.restriction;
  const readableAccess = accessLabels[event.access] || event.access;

  return (
    <Card className="event-detail-card">
      <h1>{event.title}</h1>
      {event.imageUrl && <img src={`http://localhost:8080/uploads/${event.imageUrl}`} alt={event.title} />}


      <h3>Descripción</h3>
      <p>{event.description}</p>

      <h3>Fecha y hora de inicio</h3>
      <p>{moment(event.start).format('DD-MM-YYYY HH:mm')}</p>

      <h3>Fecha y hora de fin</h3>
      <p>{moment(event.end).format('DD-MM-YYYY HH:mm')}</p>

      <h3>Acceso</h3>
      <p>{readableAccess}</p>

      <h3>Precio</h3>
      <p> {event.price}</p>

      <h3>Restricción</h3>
      <p> {readableRestriction}</p>

      <h3>Ubicación</h3>
      <p>{event.address}</p>

      <h3>Contacto</h3>
      <p>{event.phoneContact}</p>

      <Button className="volver-button" onClick={() => navigate(-1)}>Volver</Button>

    </Card>
  );
};

export default EventDetail;