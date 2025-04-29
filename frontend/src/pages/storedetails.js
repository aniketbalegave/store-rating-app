import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import RatingForm from '../components/ratingform';

const StoreDetail = () => {
  const { id } = useParams();  // Get store ID from the URL
  const [store, setStore] = useState(null);
  const [userRating, setUserRating] = useState(null);

  useEffect(() => {
    const fetchStoreDetails = async () => {
      try {
        const response = await api.get(`/stores/${id}`);
        setStore(response.data);
      } catch (error) {
        console.error('Error fetching store details', error);
      }
    };

    const fetchUserRating = async () => {
      try {
        const response = await api.get(`/ratings/user?store_id=${id}`);
        if (response.data.length > 0) {
          setUserRating(response.data[0].rating);
        }
      } catch (error) {
        console.error('Error fetching user rating', error);
      }
    };

    fetchStoreDetails();
    fetchUserRating();
  }, [id]);

  const handleRatingSubmit = async (rating) => {
    try {
      await api.post('/ratings', { store_id: id, rating });
      setUserRating(rating);
      alert('Rating submitted successfully');
    } catch (error) {
      console.error('Error submitting rating', error);
      alert('Failed to submit rating');
    }
  };

  if (!store) return <div>Loading...</div>;

  return (
    <div>
      <h2>{store.name}</h2>
      <p>{store.address}</p>
      <p>Average Rating: {store.average_rating || 'No ratings yet'}</p>
      <h4>Your Rating: {userRating || 'Not rated yet'}</h4>

      <RatingForm existingRating={userRating} onSubmit={handleRatingSubmit} />
    </div>
  );
};

export default StoreDetail;
