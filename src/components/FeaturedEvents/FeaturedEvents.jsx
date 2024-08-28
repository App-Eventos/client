import React, { useState } from 'react';
import { Card, Button, Badge } from 'antd';
import { StarOutlined, StarFilled, LikeOutlined } from '@ant-design/icons';
import './FeaturedEvents.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { message } from "antd";

const FeaturedEvents = ({ onFavoriteToggle, favorites = [], events, setEvents, state, redirectToLogin }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const voteForEvent = async (id) => {
    if (!state.isAuthenticated) {
      redirectToLogin("Debes iniciar sesión para votar.");
      return;
    }
    try {
      const url = `http://localhost:8080/event/vote/${id}`;
      const userId = state.user._id;

      const response = await axios.put(url, { userId });
      const updatedEvent = response.data;

      setEvents((prevEvents) =>
        prevEvents.map((event) => (event._id === id ? updatedEvent : event))
      );
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;

      messageApi.open({
        type: 'error',
        content: errorMessage,
      });
    }
  };

  const sortedEvents = [...events].sort((a, b) => b.votes - a.votes);

  const handleFavoriteToggle = async (eventId) => {
    if (!state.isAuthenticated) {
        redirectToLogin("Debes iniciar sesión para agregar a favoritos.");
        return;
    }

    // Check if the event is already a favorite
    if (favorites.includes(eventId)) {
      messageApi.open({
          type: 'info',
          content: "Este evento ya está en tus favoritos.",
      });
      return; // Prevent further execution
  }

    try {
        
        const response = await axios.post(
            "http://localhost:8080/user/favorites",
            { eventId },
            {
                headers: {
                    token_user: localStorage.getItem("token"),
                },
            }
        );

        // Show success message
        messageApi.open({
            type: 'success',
            content: response.data.message, // Message from the server
        });

        onFavoriteToggle(eventId); // Update the favorites list

    } catch (error) {
        // Handle specific errors
        const errorMessage = error.response?.data?.message || "Ocurrió un error al agregar a favoritos.";
        messageApi.open({
            type: 'error',
            content: errorMessage,
        });
    }
};

  return (
    <>
      {contextHolder}
      <div className="featured-events">
        <h2>Eventos</h2>
        <div className="events-list">
          {sortedEvents.map((event) => (
            <Card
              key={event._id}
              className="custom-card"
              cover={
                <img
                  alt={event.title}
                  src={`http://localhost:8080/uploads/${event.imageUrl}`}
                  className="custom-card-image"
                />
              }
              actions={[
                <Button
                  type="link"
                  onClick={() => handleFavoriteToggle(event._id)}
                  className="custom-card-button"
                  icon={
                    favorites.includes(event._id) ? (
                      <StarFilled style={{ color: "#fadb14" }} />
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
              <Badge
                count={event.votes}
                overflowCount={99}
                className="custom-card-badge"
              >
                <Card.Meta
                  title={
                    <Link
                      to={`/event/${event._id}`}
                      className="custom-card-title"
                    >
                      {event.title}
                    </Link>
                  }
                  description={`${moment(event.start).format(
                    "YYYY-MM-DD HH:mm"
                  )} - ${event.price}`}
                  className="custom-card-description"
                />
              </Badge>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default FeaturedEvents;
