import React, { useState } from 'react';
import { Card, Button, Badge } from 'antd';
import { StarOutlined, StarFilled, LikeOutlined } from '@ant-design/icons';
import './FeaturedEvents.css';
import axios from 'axios';


const FeaturedEvents = ({ onFavoriteToggle, favorites = [], events, setEvents }) => {

  const voteForEvent = async (id) => {
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
      <h2>Eventos Destacados</h2>
      <div className="events-list">
        {sortedEvents.map((event) => (
          <Card
            key={event._id}
            cover={<img alt={event.title} src={event.imageUrl} />}
            actions={[
              <Button
                type="link"
                onClick={() => onFavoriteToggle(event._id)}
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
                icon={<LikeOutlined />}
              >
                Votar
              </Button>,
            ]}
          >
            <Badge count={event.votes} overflowCount={99} style={{ backgroundColor: '#52c41a' }}>
              <Card.Meta
                title={event.title}
                description={`${event.date} - ${event.price}`}
              />
            </Badge>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedEvents;


