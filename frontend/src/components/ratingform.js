import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

const RatingForm = ({ existingRating, onSubmit }) => {
  const [rating, setRating] = useState(existingRating || 1);

  const handleChange = (e) => {
    setRating(parseInt(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(rating);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Submit Rating</h3>
      <div>
        <label>Rating: </label>
        <select value={rating} onChange={handleChange}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RatingForm;
