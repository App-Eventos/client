import React, { useState } from 'react';
import { Card, Button, Badge } from 'antd';
import { StarOutlined, StarFilled, LikeOutlined } from '@ant-design/icons';
import './FeaturedEvents.css';

const initialEvents = [
  {
    id: 1,
    title: 'Temporada mágica de circos en Joinnus',
    date: 'Miércoles 07 ago. - 1:01 am',
    price: '20.00',
    imageUrl: '/path-to-image/event1.jpg',
    votes: 0,
  },
  {
    id: 2,
    title: 'GRAN CIRCO DEL MUNDO',
    date: 'Miércoles 07 ago. - 8:30 pm',
    price: '42.00',
    imageUrl: '/path-to-image/event2.jpg',
    votes: 0,
  },
  {
    id: 3,
    title: 'MESSI10 by Cirque Du Soleil',
    date: 'Miércoles 07 ago. - 8:30 pm',
    price: '45.00',
    imageUrl: '/path-to-image/event3.jpg',
    votes: 0,
  },
];

const FeaturedEvents = ({ onFavoriteToggle, favorites = [] }) => {  // Asegúrate de que "favorites" esté definido por defecto como un array
  const [events, setEvents] = useState(initialEvents);

  const voteForEvent = (id) => {
    const updatedEvents = events.map((event) =>
      event.id === id ? { ...event, votes: event.votes + 1 } : event
    );
    setEvents(updatedEvents);
  };

  const sortedEvents = [...events].sort((a, b) => b.votes - a.votes);

  return (
    <div className="featured-events">
      <h2>Eventos Destacados</h2>
      <div className="events-list">
        {sortedEvents.map((event) => (
          <Card
            key={event.id}
            cover={<img alt={event.title} src={event.imageUrl} />}
            actions={[
              <Button
                type="link"
                onClick={() => onFavoriteToggle(event.id)}
                icon={
                  favorites.includes(event.id) ? (  // Asegúrate de que "favorites" siempre sea un array
                    <StarFilled style={{ color: '#fadb14' }} />
                  ) : (
                    <StarOutlined />
                  )
                }
              />,
              <Button
                type="link"
                onClick={() => voteForEvent(event.id)}
                icon={<LikeOutlined />}
              >
                Votar
              </Button>,
            ]}
          >
            <Badge count={event.votes} overflowCount={99} style={{ backgroundColor: '#52c41a' }}>
              <Card.Meta
                title={event.title}
                description={`${event.date} - Desde S/ ${event.price}`}
              />
            </Badge>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedEvents;


