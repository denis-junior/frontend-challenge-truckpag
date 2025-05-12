import CardMovie from "./CardMovie";
import "../App.css";
import { useGeneralContext } from "../context/GeneralContext";
import { Button } from "@mui/material";

export default function MovieViewer() {
  const { searchMovies, clearAllFilters, sortedMovies } = useGeneralContext();
  

  return (
    <div className="row justify-content-center">
      {sortedMovies.length === 0 ? (
          <>
            <div className="text-center mt-4" style={{ color: "#888", fontSize: "2rem" }}>
              No movies found with matching <b>{searchMovies}</b>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <Button variant="contained" color="inherit" onClick={clearAllFilters} >
                Clear All Filters
              </Button>
            </div>
          </>
        ) : (
          sortedMovies.map((movie) => (
            <div
              className="col-md-5 col-12 col-lg-4 col-xl-3 mt-3"
              key={movie.id}
            >
              <CardMovie key={movie.id} movie={movie} search={searchMovies} />
            </div>
          ))
        )}
    </div>
  );
}