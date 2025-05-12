import axios from "axios";
import React, { createContext, ReactNode, useState } from "react";
import { IMovie } from "../interfaces/general";
import { useLocalStorage } from "usehooks-ts";

export interface GeneralContextType {
  modalShow: boolean;
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  saveAction: () => void;
  cancelAction: () => void;
  modalData: IMovie & {
    rating: number;
    notes: string;
  };
  setModalData: React.Dispatch<
    React.SetStateAction<IMovie & { rating: number; notes: string }>
  >;
  addNote: (movie: IMovie) => void;
  getMovies: () => void;
  addFavorite: (movieId: string) => void;
  addWatch: (movieId: string) => void;
  movieRatingExists: (movieId: string) => boolean;
  movieRatingTotalStars: (movieId: string) => number;
  movies: IMovie[];
  accountSession: any;
  setAccountSession: React.Dispatch<React.SetStateAction<any>>;
  getDataFromStorage: () => void;
  sendDataToStorage: () => void;
  setSearchMovies: React.Dispatch<React.SetStateAction<any>>;
  searchMovies: string;
  includeSynopsis: boolean;
  setIncludeSynopsis: React.Dispatch<React.SetStateAction<boolean>>;
  clearAllFilters: () => void;
  setOrderBy: React.Dispatch<React.SetStateAction<string>>;
  orderBy: string;
  filteredMovies: IMovie[];
  sortedMovies: IMovie[];
  filterRating: string;
  setFilterRating: React.Dispatch<React.SetStateAction<string>>;
  filterWatched: boolean;
  setFilterWatched: React.Dispatch<React.SetStateAction<boolean>>;
  filterFavorites: boolean;
  setFilterFavorites: React.Dispatch<React.SetStateAction<boolean>>;
  filterWithNotes: boolean;
  setFilterWithNotes: React.Dispatch<React.SetStateAction<boolean>>;
  messageToast: string;
  setMessageToast: React.Dispatch<React.SetStateAction<string>>;
  toastOpen: boolean;
  setToastOpen: React.Dispatch<React.SetStateAction<boolean>>;
  colorToast: string;
  setColorToast: React.Dispatch<React.SetStateAction<string>>;
}

export interface IRating extends IMovie {
  rating: number;
  notes: string;
}

interface IAccountSession {
  favorites: Record<string, boolean>;
  watched: Record<string, boolean>;
  notes: Record<string, { rating: number; notes: string }>;
}

const initialModalData: IRating = {
  id: "",
  title: "",
  original_title: "",
  original_title_romanised: "",
  image: "",
  movie_banner: "",
  description: "",
  director: "",
  producer: "",
  release_date: "",
  running_time: "",
  rt_score: "",
  people: [],
  species: [],
  locations: [],
  vehicles: [],
  url: "",
  rating: 0,
  notes: "",
};

export const GeneralContext = createContext<GeneralContextType | undefined>(
  undefined
);

export const useGeneralContext = (): GeneralContextType => {
  const context = React.useContext(GeneralContext);
  if (!context) {
    throw new Error("useGeneralContext must be used within a GeneralProvider");
  }
  return context;
};

export const GeneralProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [messageToast, setMessageToast] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [colorToast, setColorToast] = useState("");

  const [movies, setMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState("");
  const [includeSynopsis, setIncludeSynopsis] = useState(false);
  const [orderBy, setOrderBy] = useState("default");
  const [filterRating, setFilterRating] = useState("");

  const [accountSession, setAccountSession] = useLocalStorage<IAccountSession>(
    "data",
    {
      favorites: {},
      watched: {},
      notes: {},
    }
  );

  const [filterWatched, setFilterWatched] = useState(false);
  const [filterFavorites, setFilterFavorites] = useState(false);
  const [filterWithNotes, setFilterWithNotes] = useState(false);

  const filteredMovies = movies
    .filter((movie: IMovie) => {
      // Filtro de rating já existente...
      if (filterRating === "all" || filterRating === "") return true;
      const note = accountSession.notes[movie.id];
      if (filterRating === "any")
        return !!note && typeof note.rating === "number" && note.rating > 0;
      if (filterRating === "unrated") return !note || !note.rating;
      return !!note && note.rating === Number(filterRating);
    })
    .filter((movie: IMovie) => {
      // Filtros combináveis
      if (filterWatched && !accountSession.watched[movie.id]) return false;
      if (filterFavorites && !accountSession.favorites[movie.id]) return false;
      if (
        filterWithNotes &&
        !(
          accountSession.notes[movie.id] &&
          accountSession.notes[movie.id].rating > 0
        )
      )
        return false;
      return true;
    })
    .filter((movie: IMovie) => {
      // Filtro de busca já existente...
      if (includeSynopsis === true) {
        return (
          movie.title.toLowerCase().includes(searchMovies.toLowerCase()) ||
          movie.original_title
            .toLowerCase()
            .includes(searchMovies.toLowerCase()) ||
          movie.description
            .toLowerCase()
            .includes(searchMovies.toLowerCase()) ||
          movie.original_title_romanised
            .toLowerCase()
            .includes(searchMovies.toLowerCase())
        );
      }
      const search = searchMovies.toLowerCase();
      return (
        movie.title.toLowerCase().includes(search) ||
        movie.original_title.toLowerCase().includes(search)
      );
    });

  const sortedMovies = [...filteredMovies].sort((a: IMovie, b: IMovie) => {
    switch (orderBy) {
      case "title_asc":
        return a.title.localeCompare(b.title);
      case "title_desc":
        return b.title.localeCompare(a.title);
      case "duration_asc":
        return Number(a.running_time) - Number(b.running_time);
      case "duration_desc":
        return Number(b.running_time) - Number(a.running_time);
      case "rating_asc":
        return (a.rating || 0) - (b.rating || 0);
      case "rating_desc":
        return (b.rating || 0) - (a.rating || 0);
      case "score_asc":
        return Number(a.rt_score) - Number(b.rt_score);
      case "score_desc":
        return Number(b.rt_score) - Number(a.rt_score);
      default:
        return 0;
    }
  });

  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState(
    {} as IMovie & {
      rating: number;
      notes: string;
    }
  );

  async function getMovies(): Promise<void> {
    try {
      const response = await axios.get("https://ghibliapi.vercel.app/films");
      setMovies(response.data);
    } catch (error) {
      console.error("Erro ao buscar os filmes:", error);
    }
  }

  function addNote(movie: IMovie): void {
    setModalShow(true);
    const note = accountSession?.notes[movie.id];
    if (note) {
      setModalData({
        ...movie,
        rating: note.rating,
        notes: note.notes,
      });
    } else {
      setModalData({ ...movie, rating: 0, notes: "" });
    }
  }

  function saveAction(): void {
    setAccountSession((prevSession) => ({
      ...prevSession,
      notes: {
        ...prevSession.notes,
        [modalData.id]: { rating: modalData.rating, notes: modalData.notes },
      },
    }));
    setMessageToast(`${modalData.title} has been updated!`);
    setColorToast("#1e40af");
    setToastOpen(true);
    setModalShow(false);
  }

  function cancelAction(): void {
    setModalData(initialModalData);
    setModalShow(false);
  }

  function movieRatingExists(movieId: string): boolean {
    return !!accountSession.notes[movieId];
  }

  function movieRatingTotalStars(movieId: string): number {
    const note = accountSession.notes[movieId];
    if (note) {
      return note.rating;
    }
    return 0;
  }

  function addFavorite(movieId: string): void {
    const alreadyFavorite = !!accountSession.favorites[movieId];

    setAccountSession((prevSession) => ({
      ...prevSession,
      favorites: {
        ...prevSession.favorites,
        [movieId]: !prevSession.favorites[movieId],
      },
    }));
    if(alreadyFavorite) {

      setColorToast("black");
      setMessageToast("Removed from Favorites!");
      setToastOpen(true);

     }else {

      setColorToast("#991b1b");
      setMessageToast("Added to Favorites!");
      setToastOpen(true);
    }
  }

  function addWatch(movieId: string): void {
    const alreadyWatched = !!accountSession.watched[movieId];

    setAccountSession((prevSession) => ({
      ...prevSession,
      watched: {
        ...prevSession.watched,
        [movieId]: !prevSession.watched[movieId],
      },
    }));

    if (alreadyWatched) {
      setColorToast("black");
      setMessageToast("Marked as unWatched!");
      setToastOpen(true);
    } else {
      setColorToast("#166534");
      setMessageToast("Marked as Watched!");
      setToastOpen(true);
    }
  }

  function sendDataToStorage(): void {
    const data = {
      favorites: accountSession.favorites,
      watched: accountSession.watched,
      notes: accountSession.notes,
    };
    localStorage.setItem("accountSession", JSON.stringify(data));
  }

  function getDataFromStorage(): void {
    const data = localStorage.getItem("accountSession");
    if (data) {
      const parsedData = JSON.parse(data);
      setAccountSession({
        favorites: parsedData.favorites || {},
        watched: parsedData.watched || {},
        notes: parsedData.notes || {},
      });
    }
  }

  function clearAllFilters(): void {
    setSearchMovies("");
    setIncludeSynopsis(false);
    setOrderBy("default");
    setFilterRating("");
    setFilterWatched(false);
    setFilterFavorites(false);
    setFilterWithNotes(false);
  }

  return (
    <GeneralContext.Provider
      value={{
        modalShow,
        setModalShow,
        saveAction,
        cancelAction,
        modalData,
        setModalData,
        addNote,
        movies,
        getMovies,
        accountSession,
        setAccountSession,
        movieRatingExists,
        movieRatingTotalStars,
        addFavorite,
        addWatch,
        getDataFromStorage,
        sendDataToStorage,
        searchMovies,
        setSearchMovies,
        setIncludeSynopsis,
        includeSynopsis,
        clearAllFilters,
        sortedMovies,
        filteredMovies,
        orderBy,
        setOrderBy,
        filterRating,
        setFilterRating,
        filterWatched,
        setFilterWatched,
        filterFavorites,
        setFilterFavorites,
        filterWithNotes,
        setFilterWithNotes,
        messageToast,
        setMessageToast,
        toastOpen,
        setToastOpen,
        colorToast,
        setColorToast,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};
