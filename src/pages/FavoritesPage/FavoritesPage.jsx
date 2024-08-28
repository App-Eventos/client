import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, Button, Avatar, Modal } from 'antd';
import { Link } from 'react-router-dom';
import './FavoritesPage.css';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user/favorites', {
          headers: {
            'token_user': localStorage.getItem("token"),
          },
        });
        setFavorites(response.data);
      } catch (error) {
        console.error('Error al obtener favoritos:', error);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/user/favorites/${id}`, {
        headers: {
          'token_user': localStorage.getItem("token"),
        },
      });
      setFavorites(favorites.filter((fav) => fav._id !== id));
    } catch (error) {
      console.error('Error al eliminar favorito:', error);
    }
  };

  const confirmRemoveFavorite = (id) => {
    Modal.confirm({
      title: '¿Estás seguro que deseas eliminar este evento de la lista de favoritos?',
      okText: 'Sí',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleRemoveFavorite(id);
      },
    });
  };

  return (
    <div className="favorites-container">
      <h1>Mis Favoritos</h1>
      <List
        itemLayout="horizontal"
        dataSource={favorites}
        renderItem={(event) => (
          <List.Item
            actions={[
              <Button type="link" danger onClick={() => confirmRemoveFavorite(event._id)}>
                Eliminar
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={`http://localhost:8080/uploads/${event.imageUrl}`} />}
              title={event.title}
              description={event.description || 'No hay descripción disponible'} // Mostrar la descripción o un mensaje alternativo
            />
          </List.Item>
        )}
      />
      <div className="back-to-events">
        <Link to="/">Volver a Eventos</Link>
      </div>
    </div>
  );
};

export default FavoritesPage;
