import React from 'react';

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
