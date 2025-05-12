export interface IOptionSelect {
  value: string;
  label: string;
}

export interface Ili {
  label: string;
  icon?: React.ReactNode;
  active: boolean;
  onClick: () => void;
  backColor?: string;
}

export interface IMovie {
  id: string;
  title: string;
  original_title: string;
  original_title_romanised: string;
  image: string;
  movie_banner: string;
  description: string;
  director: string;
  producer: string;
  release_date: string;
  running_time: string;
  rt_score: string;
  people: string[];
  species: string[];
  locations: string[];
  vehicles: string[];
  url: string;
  rating?: number;
  notes?: string;
}

export interface ICardMovieProps {
  movie: IMovie;
  search: string;
}