import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "../App.css";
import { darken, orderByOptions } from "../utils";
import { IOptionSelect } from "../interfaces/general";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import NoteOutlinedIcon from "@mui/icons-material/NoteOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Li from "./Li";
import RatingButton from "./RatingButton";
import { Col, Row } from "react-bootstrap";
import { useGeneralContext } from "../context/GeneralContext";
import ActiveFilterPill from "./ActiveFilterPill";
import StarRating from "./StarRating";

export default function Commands() {
  const {
    searchMovies,
    setSearchMovies,
    setIncludeSynopsis,
    includeSynopsis,
    setOrderBy,
    orderBy,
    clearAllFilters,
    filterRating,
    filterWatched,
    setFilterWatched,
    filterFavorites,
    setFilterFavorites,
    filterWithNotes,
    setFilterWithNotes,
    setFilterRating
    
  } = useGeneralContext();

  return (
    <div className="commands">
      
      <Row className="w-100">
        <TextField
          label="Search Movies"
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
          onChange={(e) => setSearchMovies(e.target.value)}
          value={searchMovies}
          variant="outlined"
        />
      </Row>
      <Row className="mt-4 w-100">
        <Col>
          <FormControlLabel
            control={<Checkbox />}
            label="Include synopsis in search"
            onChange={() => {
              setIncludeSynopsis(!includeSynopsis);
            }}
            checked={includeSynopsis}
            name="include-synopsis"
            value={false}
          />
        </Col>
        <Col className="d-flex justify-content-end">
          <FormControl className="w-25">
            <InputLabel id="demo-simple-select-label">Order By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={orderBy}
              onChange={(e) => setOrderBy(e.target.value)}
              label="Order By"
            >
              {orderByOptions?.map((option: IOptionSelect) => (
                <MenuItem value={option.value}>{option.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Col>
      </Row>
      <Row className="mt-4 w-100" md={2} sm={1}>
        <Col md={8} flex={2}>
          <div className="d-flex align-items-center flex-wrap">
            Filters:
            <Li
              label="Watched"
              icon={<VisibilityOutlinedIcon />}
              active={filterWatched}
              onClick={() => setFilterWatched((prev) => !prev)}
              backColor="#dcfce7"
            />
            <Li
              label="Favorites"
              icon={<FavoriteBorderOutlinedIcon />}
              active={filterFavorites}
              onClick={() => setFilterFavorites((prev) => !prev)}
              backColor="#fee2e2"
            />
            <Li
              label="With Notes"
              icon={<NoteOutlinedIcon />}
              active={filterWithNotes}
              onClick={() => setFilterWithNotes((prev) => !prev)}
              backColor="#dbeafe"
            />
            <div>
              <RatingButton />
            </div>
          </div>
        </Col>
        <Col md={4} className="d-flex justify-content-end align-items-center">
          <p
            className="p-0 m-0 d-flex justify-content-end align-items-center"
            style={{ cursor: "pointer" }}
            onClick={clearAllFilters}
          >
            Clear All
          </p>
        </Col>
      </Row>
      <Row className="w-100">
        <div
          style={{
            padding: "10px",
            borderRadius: "5px",
            marginTop: "10px",
          }}
          className="w-100 d-flex align-items-center flex-wrap"
        >
          {(orderBy !== "default" ||
            filterWatched ||
            filterFavorites ||
            filterWithNotes ||
            filterRating) && (
            <p className="m-0 p-0 me-2" style={{ color: "gray" }}>
              Active Filters:
            </p>
          )}
           {orderBy !== "default" && (
            <ActiveFilterPill
              label={
                orderByOptions.find((option) => option.value === orderBy)?.label ||
                "Order By"
              }
              color="#e1d3ed"
              onClick={() => setOrderBy("default")}
            />
          )}
          {filterWatched && (
            <ActiveFilterPill
              label="Watched"
              color="#dcfce7"
              onClick={() => setFilterWatched(false)}
            />
          )}
          {filterFavorites && (
            <ActiveFilterPill
              label="Favorites"
              color="#fee2e2"
              onClick={() => setFilterFavorites(false)}
            />
          )}
          {filterWithNotes && (
            <ActiveFilterPill
              label="With Notes"
              color="#dbeafe"
              onClick={() => setFilterWithNotes(false)}
            />
          )}

          {filterRating && (
            <div
              className="d-flex align-items-center px-3 me-2"
              style={{
                borderRadius: "20px",
                backgroundColor: "#fef9c3",
                border: `2px solid ${darken("#fef9c3", 0.5)}`,
              }}
            >
              <p className="m-0 p-0 d-flex align-items-center justify-content-center">
                {filterRating.length > 1 ? (
                  <>{filterRating}</>
                ) : (
                  <>
                    {filterRating}&nbsp;
                    {Number(filterRating) > 1 ? "stars" : "star"}
                    <StarRating totalStars={Number(filterRating)} />{" "}
                  </>
                )}
              </p>
              <span
                // onClick={onClick}
                className="ms-1"
                style={{ cursor: "pointer" }}
                onClick={() => setFilterRating("")}
              >
                <CloseIcon style={{ width: "1.2rem" }} />
              </span>
            </div>
          )}
        </div>
      </Row>
    </div>
  );
}
