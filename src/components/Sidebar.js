// src/components/Sidebar.js
import React from 'react';
import './Sidebar.css';

const Sidebar = ({ onFilter }) => {
  const handleFilterChange = (e) => {
    onFilter(e.target.value);
  };

  return (
    <div className="sidebar">
      <h3>Filtrar por estrelas</h3>
      <ul>
        {[5, 4, 3, 2, 1].map(star => (
          <li key={star}>
            <input
              type="checkbox"
              value={star}
              onChange={handleFilterChange}
            />
            {`${star} estrelas`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
