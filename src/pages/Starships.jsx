import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"

export const Starships = () => {
  const swapiHost = "https://www.swapi.tech/api"
  const navigate = useNavigate()
  const { store, dispatch } = useGlobalReducer()
  const [starships, setStarships] = useState([])
  const [imageErrors, setImageErrors] = useState({});

  const handleDetails = (nave) => {
    dispatch({
      type: "starship_details",
      payload: nave,
    })
    navigate("/starship-details")
  }

  const handleFavorite = (nave) => {
    const yaEstaEnFavoritos = store.favorites.some(fav => fav.uid === nave.uid)
    
    if (yaEstaEnFavoritos) {
      dispatch({
        type: 'remove_favorite',
        payload: nave
      })
    } else {
      dispatch({
        type: 'add_favorite',
        payload: { ...nave, category: 'starship' }
      })
    }
  }
  const handleImageError = (uid) => {
    setImageErrors(prev => ({...prev, [uid]: true}));
  };

  const getStarships = async () => {
    const guardadas = localStorage.getItem("starships")
    if (guardadas) {
      setStarships(JSON.parse(guardadas))
      return
    }

    const uri = `${swapiHost}/starships`
    const response = await fetch(uri)

    if (!response.ok) {
      console.log("Error:", response.status, response.statusText)
      return
    }

    const data = await response.json()
    localStorage.setItem("starships", JSON.stringify(data.results))
    setStarships(data.results)
  }

  useEffect(() => {
    getStarships()
  }, [])

  return (
    <div className="container mt-3">
      <h1 className="text-center">Naves</h1>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-2">
        {starships.map((item) => (
          <div key={item.uid} className="col">
            <div className="card border-dark rounded my-3 mx-2 text-bg-dark">
              <img
                className="card-img-top"
                src={imageErrors[item.uid] 
                  ? "https://upload.wikimedia.org/wikipedia/commons/d/da/Imagen_no_disponible.svg"
                  : `https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/starships/${item.uid}.jpg`
                }
                alt={item.name}
                onError={() => handleImageError(item.uid)}
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
  )
}