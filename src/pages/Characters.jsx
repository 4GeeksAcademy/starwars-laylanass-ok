import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Characters = () => {
  const swapiHost = "https://www.swapi.tech/api";
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();
  const [characters, setCharacters] = useState([]);

  const handleDetails = (personajes) => {
    dispatch({
      type: 'character_details',
      payload: personajes
    })
    navigate("/character-details");
  };

  const handleFavorite = (personaje) => {
    const yaEstaEnFavoritos = store.favorites.some(fav => fav.uid === personaje.uid)
    
    if (yaEstaEnFavoritos) {
      dispatch({
        type: 'remove_favorite',
        payload: personaje
      })
    } else {
      dispatch({
        type: 'add_favorite',
        payload: { ...personaje, category: 'character' }
      })
    }
  }

  const getCharacters = async () => {
    const personajes = localStorage.getItem("characters")
    if (personajes) {
      setCharacters(JSON.parse(personajes))
      return;
    }

    const uri = `${swapiHost}/people`;
    const response = await fetch(uri);

    if (!response.ok) {
      console.log("Error:", response.status, response.statusText);
      return;
    }

    const data = await response.json();
    localStorage.setItem("characters", JSON.stringify(data.results))
    setCharacters(data.results)
  };

  useEffect(() => {
    getCharacters();
  }, []); 

  return (
    <div className="container mt-3">
      <h1 className="text-center">Personajes</h1>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-2">
        {characters.map((item) => (
          <div key={item.uid} className="col">
            <div className="card border-dark rounded my-3 mx-2 text-bg-dark">
              <img
                className="card-img-top"
                src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/characters/${item.uid}.jpg`}
                alt={item.name}
              />

              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>

                <div className="d-flex justify-content-between">
                  <span
                    className="btn btn-secondary"
                    onClick={() => handleDetails(item)}
                  >
                    Details
                  </span>

                  <button 
                    className="btn btn-outline-warning"
                    onClick={() => handleFavorite(item)}
                  >
                    <i className={`fa-heart fa-lg ${store.favorites.some(fav => fav.uid === item.uid) ? 'fas' : 'far'}`}></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};