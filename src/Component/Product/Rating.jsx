import { useState, useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const Rating = ({ onRatingClick, productID,ratingValue }) => {

  // Default rating is 1 if ratingValue is not provided
  const [selectedRating, setSelectedRating] = useState(ratingValue !== null && ratingValue !== undefined ? ratingValue : 1);


 useEffect(() => {
  // This effect will update the selectedRating whenever ratingValue changes
  if (ratingValue !== null && ratingValue !== undefined) {
    setSelectedRating(ratingValue);
  }
}, [ratingValue]);

 // Variable to store the clicked rating
  const handleRatingChange = (event) => {
    const newRating = parseInt(event.target.value, 10);
    setSelectedRating(newRating);

    onRatingClick(newRating);
  };

  return (
    <div className="">
      <span className="font-bold pr-2 ">Rating: </span>
      <div className="rating ">
        <input
          type="radio"
          name={productID}
          className="mask mask-star-2 bg-orange-400"
          value="1"
          checked={selectedRating === 1}
          onChange={handleRatingChange}
        />
        <input
          type="radio"
          name={productID}
          className="mask mask-star-2 bg-orange-400"
          value="2"
          checked={selectedRating === 2}
          onChange={handleRatingChange}
        />
        <input
          type="radio"
          name={productID}
          className="mask mask-star-2 bg-orange-400"
          value="3"
          checked={selectedRating === 3}
          onChange={handleRatingChange}
        />
        <input
          type="radio"
          name={productID}
          className="mask mask-star-2 bg-orange-400"
          value="4"
          checked={selectedRating === 4}
          onChange={handleRatingChange}
        />
        <input
          type="radio"
          name={productID}
          className="mask mask-star-2 bg-orange-400"
          value="5"
          checked={selectedRating === 5}
          onChange={handleRatingChange}
        />
      </div>
    </div>
  );
};

export default Rating;