import Navbar from "../../components/Navbar";
import "./Main.css";
import Commands from "../../components/Commands";
import MovieViewer from "../../components/MovieViewer";
import { ModalNote } from "../../components/ModalNote";
import { useContext, useEffect } from "react";
import { GeneralContext } from "../../context/GeneralContext";
import Toast from "../../components/Toast";

export default function Main() {
  const context = useContext(GeneralContext);

  if (!context) {
    throw new Error("GeneralContext must be used within a GeneralProvider");
  }
  const {
    modalShow,
    setModalShow,
    getMovies,
    messageToast,
    toastOpen,
    setToastOpen,
    colorToast,
  } = context;

  useEffect(() => {
    getMovies();
  });

  return (
    <div className="container">
      <Toast
        open={toastOpen}
        message={messageToast}
        onClose={() => setToastOpen(false)}
        backColor={colorToast}
      />
      <Navbar
        title="Studio Ghibli Collection"
        subtitle="Explore the magical world of Studio Ghibli films.
      Mark your favorites and keep track of what you've watched."
      />
      <Commands />
      <MovieViewer />
      <ModalNote show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}
