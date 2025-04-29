import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

const StoreList = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await api.get('/stores');
        setStores(response.data);
      } catch (error) {
        console.error('Failed to fetch stores', error);
      }
    };
    fetchStores();
  }, []);

  return (
    <div>
      <h2>Stores</h2>
      <ul>
        {stores.map((store) => (
          <li key={store.id}>
            <Link to={`/store/${store.id}`}>{store.name}</Link> - {store.average_rating || 'No ratings yet'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoreList;
