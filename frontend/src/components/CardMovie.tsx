import { useContext } from "react";
import Card from "react-bootstrap/Card";
import { formatMinutesToHours, highlightMatch } from "../utils";
import { ExpandableText } from "./ExpandableText";
import StarIcon from "@mui/icons-material/Star";
import StarRating from "./StarRating";
import { Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import NoteIcon from "@mui/icons-material/Note";
import NoteOutlinedIcon from "@mui/icons-material/NoteOutlined";
import { GeneralContext } from "../context/GeneralContext";
import Tooltip from "@mui/material/Tooltip";
import "../App.css";
import { ICardMovieProps } from "../interfaces/general";

function CardMovie({ movie, search }: ICardMovieProps) {
  const context = useContext(GeneralContext);

  if (!context) {
    throw new Error("GeneralContext must be used within a GeneralProvider");
  }

  const {
    addNote,
    addFavorite,
    addWatch,
    accountSession,
    movieRatingExists,
    movieRatingTotalStars,
    includeSynopsis,
  } = context;

  return (
    <Card className="movie-card">
      {movie ? (
        <>
          <div className="card-img-container">
            <Card.Img
              variant="top"
              src={movie.image}
              alt={movie.title}
              className="card-img"
            />
            <div className="tag-badges-stack">
              {accountSession.notes[movie.id] && (
                <div
                  className="tag-badge tag-note d-flex align-items-center justify-content-center"
                  style={{ backgroundColor: "#2f7ee4", color: "#fff" }}
                >
                  <NoteOutlinedIcon style={{ width: "1.2rem" }} />{" "}
                  <span>Notes</span>
                </div>
              )}
              {accountSession.favorites[movie.id] && (
                <div
                  className="tag-badge tag-fav d-flex align-items-center justify-content-center"
                  style={{ backgroundColor: "#f43f5e", color: "#fff" }}
                >
                  <FavoriteIcon style={{ width: "1.2rem" }} />
                  <span>Favorite</span>
                </div>
              )}
              {accountSession.watched[movie.id] && (
                <div
                  className="tag-badge tag-watch d-flex align-items-center justify-content-center"
                  style={{ backgroundColor: "#4ade80", color: "#fff" }}
                >
                  <VisibilityOutlinedIcon style={{ width: "1.2rem" }} />{" "}
                  <span>Watched</span>
                </div>
              )}
              {accountSession.notes[movie.id] && (
                <div
                  className="tag-badge tag-watch d-flex align-items-center justify-content-center"
                  style={{
                    color: "black",
                    backgroundColor: "#bbaa2a",
                    fontSize: "1rem",
                  }}
                >
                  <StarIcon style={{ width: "1.2rem" }} />{" "}
                  <span>{accountSession.notes[movie.id].rating}/5</span>
                </div>
              )}
            </div>
            <div className="card-img-overlay">
              <span className="movie-title" style={{ fontSize: "1rem" }}>
                {movie.original_title_romanised}
              </span>
            </div>
          </div>
          <Card.Body>
            <Tooltip
              title={`${movie.original_title + " "}(${
                movie.original_title_romanised
              })`}
              arrow
            >
              <Card.Title className="text-truncate">
                <b>{highlightMatch(movie.title, search)}</b>
              </Card.Title>
            </Tooltip>

            <Card.Text style={{ color: "gray" }}>
              {movie.release_date} •{" "}
              {formatMinutesToHours(Number(movie.running_time))}
            </Card.Text>
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center justify-content-between w-100">
                <div className="d-flex align-items-center">
                  <StarIcon style={{ color: "#eab308" }} />{" "}
                  <p
                    className="m-0 p-0"
                    style={{ fontSize: ".9rem", fontWeight: "500" }}
                  >
                    {movie.rt_score}%
                  </p>
                </div>
                <div className="d-flex align-items-center justify-content-end">
                  <p className="m-0 p-0" style={{ color: "gray" }}>
                    {movieRatingExists(movie.id) ? (
                      <StarRating
                        totalStars={movieRatingTotalStars(movie.id)}
                      />
                    ) : (
                      "not rated"
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <ExpandableText
                includeSynopsis={includeSynopsis}
                text={movie.description}
                maxChars={150}
              />
            </div>
            <div
              className="m-0 p-0"
              style={{ fontSize: "0.9rem", lineHeight: "1.5rem" }}
            >
              <p style={{ color: "gray" }} className="m-0 p-0">
                Director: {movie.director}
              </p>
              <p style={{ color: "gray" }} className="p-0">
                Producer: {movie.producer}
              </p>
            </div>
            <div
              className="m-0 p-0"
              style={{ fontSize: "0.9rem", lineHeight: "1.5rem" }}
            >
              <p
                style={{ color: "gray", backgroundColor: "#eff6ff" }}
                className=" p-1 ps-1"
              >
                {accountSession.notes[movie.id] && (
                  <span style={{ color: "#4b5563" }}>
                    <p
                      style={{ fontSize: ".85rem", color: "#2563eb" }}
                      className="m-0 p-0"
                    >
                      <NoteIcon style={{ width: "1.3rem" }} /> Your Notes:
                    </p>
                    <p>{accountSession.notes[movie.id].notes}</p>
                  </span>
                )}
              </p>
            </div>
            <Card.Body className="d-flex flex-column align-items-center gap-2 p-0">
              {accountSession.watched[movie.id] ? (
                <Button
                  color="inherit"
                  className="w-100 gap-2 bg-dark text-white"
                  variant="outlined"
                  onClick={() => {
                    addWatch(movie.id);
                  }}
                >
                  <VisibilityOutlinedIcon /> Watched
                </Button>
              ) : (
                <Button
                  color="inherit"
                  className="w-100 gap-2"
                  variant="outlined"
                  onClick={() => {
                    addWatch(movie.id);
                  }}
                >
                  <VisibilityIcon /> Mark Watched
                </Button>
              )}
              {accountSession.favorites[movie.id] ? (
                <Button
                  color="error"
                  className="w-100 gap-2"
                  variant="contained"
                  onClick={() => {
                    addFavorite(movie.id);
                  }}
                >
                  <FavoriteIcon /> Favorite
                </Button>
              ) : (
                <Button
                  color="inherit"
                  className="w-100 gap-2"
                  variant="outlined"
                  onClick={() => {
                    addFavorite(movie.id);
                  }}
                >
                  <FavoriteIcon /> Add Favorite
                </Button>
              )}

              <Button
                color="inherit"
                className="w-100 gap-2"
                variant="outlined"
                onClick={() => {
                  addNote(movie);
                }}
              >
                <NoteIcon /> Add Notes
              </Button>
            </Card.Body>
          </Card.Body>
        </>
      ) : (
        <Card.Body>
          <Card.Text>Carregando...</Card.Text>
        </Card.Body>
      )}
    </Card>
  );
}

export default CardMovie;
