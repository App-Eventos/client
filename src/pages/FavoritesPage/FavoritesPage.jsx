import React, { useState } from 'react';
import { List, Button, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import './FavoritesPage.css';

const favoritesData = [
  // Simulación de datos de favoritos
];

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState(favoritesData);

  const handleRemoveFavorite = (id) => {
    setFavorites(favorites.filter((fav) => fav.id !== id));
  };

  return (
    <div>
      <h1>Mis Favoritos</h1>
      <List
        itemLayout="horizontal"
        dataSource={favorites}
        renderItem={(event) => (
          <List.Item
            actions={[
              <Button type="link" danger onClick={() => handleRemoveFavorite(event.id)}>
                Eliminar
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={event.imageUrl} />}
              title={event.title}
              description={event.date}
            />
          </List.Item>
        )}
      />
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Link to="/">Volver a Eventos Destacados</Link>
      </div>
    </div>
  );
};

export default FavoritesPage;
