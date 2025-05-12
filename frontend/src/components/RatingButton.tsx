import React from "react";
import { filterRatingOptions } from "../utils";
import { IOptionSelect } from "../interfaces/general";
import "../App.css";
import { Form } from "react-bootstrap";
import { useGeneralContext } from "../context/GeneralContext";
import StarIcon from "@mui/icons-material/Star";

export default function RatingButton() {
  const { filterRating, setFilterRating } = useGeneralContext();

  return (
    <Form.Select
      style={{ marginTop: "0.5rem", marginBottom: "0.5rem", marginLeft: "1rem" }}
      value={filterRating}
      onChange={(e) => setFilterRating(e.target.value)}
    >
      <option value=""><StarIcon/> Rating</option>
      {filterRatingOptions?.map((option: IOptionSelect, key) => (
        <option key={key} value={option.value}>{option.label}</option>
      ))}
    </Form.Select>
  );
}