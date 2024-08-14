// import React, { useState, useEffect } from 'react';
// import './App.css';

// function App() {
//   const [events, setEvents] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('');
//   const [locationFilter, setLocationFilter] = useState('');
//   const [dateFilter, setDateFilter] = useState('');

//   useEffect(() => {
//     // Aquí deberías realizar una petición al backend para obtener los eventos
//     fetch('http://localhost:8080/event/list')
//       .then(response => response.json())
//       .then(data => setEvents(data))
//       .catch(error => console.error('Error fetching events:', error));
//   }, []);

//   const filteredEvents = events.filter(event => {
//     return (
//       event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
//       (!categoryFilter || event.category === categoryFilter) &&
//       (!locationFilter || event.address.includes(locationFilter)) &&
//       (!dateFilter || new Date(event.date).toISOString().split('T')[0] === dateFilter)
//     );
//   });

//   return (
//     <div className="App">
//       <header className="App-header">
//         <div className="auth-options">
//           <button>Registrarse</button>
//           <button>Iniciar Sesión</button>
//         </div>
//         <h1>Buscar Eventos</h1>
//         <div className="search-section">
//           <input 
//             type="text" 
//             placeholder="Buscar eventos..." 
//             value={searchQuery}
//             onChange={e => setSearchQuery(e.target.value)}
//           />
//           <select 
//             value={categoryFilter}
//             onChange={e => setCategoryFilter(e.target.value)}
//           >
//             <option value="">Filtrar por categoría</option>
//             <option value="Música">Música</option>
//             <option value="Deportes">Deportes</option>
//             <option value="Tecnología">Tecnología</option>
//             {/* Agrega más opciones según las categorías disponibles */}
//           </select>
//           <input 
//             type="text" 
//             placeholder="Filtrar por ubicación..." 
//             value={locationFilter}
//             onChange={e => setLocationFilter(e.target.value)}
//           />
//           <input 
//             type="date" 
//             value={dateFilter}
//             onChange={e => setDateFilter(e.target.value)}
//           />
//         </div>
//       </header>

//       <div className="event-list">
//         {filteredEvents.length > 0 ? (
//           filteredEvents.map(event => (
//             <div key={event._id} className="event-item">
//               <h2>{event.title}</h2>
//               <p>{event.description}</p>
//               <p>{new Date(event.date).toLocaleDateString()}</p>
//               <p>{event.address}</p>
//               <p>Categoría: {event.category}</p>
//               <p>Restricción: {event.restriction}</p>
//               <p>Acceso: {event.access}</p>
//               <p>Contacto: {event.phoneContact}</p>
//             </div>
//           ))
//         ) : (
//           <p>No se encontraron eventos.</p>
//         )}
//       </div>

//       <footer className="App-footer">
//         <button>Crear Evento</button>
//       </footer>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <div className="app-header">
        <h1>Event Finder</h1>
        <button>Create Event</button>
        <button>Sign Up</button>
        <button>Log In</button>
      </div>

      <div className="app-filters">
        <input type="text" placeholder="Search for events" />
        <select>
          <option value="">Category</option>
          <option value="music">Music</option>
          <option value="sports">Sports</option>
          <option value="education">Education</option>
          <option value="entertainment">Entertainment</option>
        </select>
        <input type="text" placeholder="Location" />
        <input type="date" />
      </div>

      <div className="app-event-list">
        {/* Event items will be displayed here */}
        <p>List of events...</p>
      </div>
    </div>
  );
}

export default App;
