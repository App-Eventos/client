import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, Button, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import './FavoritesPage.css';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user/favorites', {
          headers: {
            'token_user': localStorage.getItem("token"), // Asegúrate de pasar el token
          },
        });
        setFavorites(response.data); // Establecer la lista de favoritos obtenida del servidor
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
      setFavorites(favorites.filter((fav) => fav._id !== id)); // Actualizar la lista de favoritos
    } catch (error) {
      console.error('Error al eliminar favorito:', error);
    }
  };

  return (
    <div className="favorites-container"> {/* Aplicar la clase CSS aquí */}
      <h1>Mis Favoritos</h1>
      <List
        itemLayout="horizontal"
        dataSource={favorites}
        renderItem={(event) => (
          <List.Item
            actions={[
              <Button type="link" danger onClick={() => handleRemoveFavorite(event._id)}>
                Eliminar
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={`http://localhost:8080/uploads/${event.imageUrl}`} />}
              title={event.title}
              description={`${event.date}`} // Asegúrate de que `event.date` esté disponible
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
