import React, { useState } from 'react';
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

interface StarRatingProps {
  value: number;
  onRatingChange: (value: number) => void;
}

const StarRatingModal: React.FC<StarRatingProps> = ({ value, onRatingChange }) => {
  const [hover, setHover] = useState(-1);

  return (
    <div className='d-flex align-items-center'>
      <Rating
        name="rating"
        value={value}
        precision={1}
        icon={<StarIcon fontSize="inherit" />}
        emptyIcon={<StarIcon fontSize="inherit" />}
        onChange={(_, newValue) => {
          if (newValue !== null) {
            onRatingChange(newValue);
          }
        }}
        onChangeActive={(_, newHover) => {
          setHover(newHover);
        }}
      />
      <span style={{ marginLeft: 10 }}>
        {hover !== -1 ? `${hover}/5` : `${value}/5`}
      </span>
    </div>
  );
};

export default StarRatingModal;
