import React, { useState } from 'react';
import { Card, Button, Badge } from 'antd';
import { StarOutlined, StarFilled, LikeOutlined } from '@ant-design/icons';
import './FeaturedEvents.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';


const FeaturedEvents = ({ onFavoriteToggle, favorites = [], events, setEvents, state, redirectToLogin }) => {

  const voteForEvent = async (id) => {
    //Verifica si el usuario ha iniciado
    if (!state.isAuthenticated) {
      redirectToLogin("Debes iniciar sesión para votar.");
      return;
    }
    try {
      const response = await axios.put(`http://localhost:8080/event/vote/${id}`);
      const updatedEvent = response.data;

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === id ? updatedEvent : event
        )
      );
    } catch (error) {
      console.error('Error al votar:', error);
    }
  };

  const sortedEvents = [...events].sort((a, b) => b.votes - a.votes);

  return (
    <div className="featured-events">
      <h2>Eventos</h2>
      <div className="events-list">
        {sortedEvents.map((event) => (
          <Card
            key={event._id}
            className="custom-card"
            cover={<img alt={event.title} src={`http://localhost:8080/uploads/${event.imageUrl}`} className="custom-card-image" />}
            actions={[
              <Button
                type="link"
                onClick={() => onFavoriteToggle(event._id)}
                className="custom-card-button"
                icon={
                  favorites.includes(event._id) ? (
                    <StarFilled style={{ color: '#fadb14' }} />
                  ) : (
                    <StarOutlined />
                  )
                }
              />,
              <Button
                type="link"
                onClick={() => voteForEvent(event._id)}
                className="custom-card-button"
                icon={<LikeOutlined />}
              >
                Votar
              </Button>,
            ]}
          >
            <Badge count={event.votes} overflowCount={99} className="custom-card-badge">
              <Card.Meta
                title={
                  <Link to={`/event/${event._id}`} className="custom-card-title">
                    {event.title}
                  </Link>
                }
                description={`${moment(event.start).format('YYYY-MM-DD HH:mm')} - ${event.price}`}
                className="custom-card-description"
              />
            </Badge>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedEvents;
