import React from "react";
import StarIcon from "@mui/icons-material/Star";

export default function StarRating({ totalStars }: { totalStars: number }) {
  return (
    <>
      {Array.from({ length: totalStars }).map((_, index) => (
        <StarIcon key={index} style={{ color: "#eab308", fontSize: "1rem" }} />
      ))}
    </>
  );
}
