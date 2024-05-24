import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const StarRating: React.FC<{ rate: number }> = ({ rate }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rate) {
      stars.push(<FaStar key={i} className="text-yellow-500" />);
    } else if (i - rate < 1) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
    } else {
      stars.push(<FaStar key={i} className="text-gray-300" />);
    }
  }

  return <div className="flex items-center">{stars}</div>;
};
export default StarRating;
