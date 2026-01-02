import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"

export const Planets = () => {
  const swapiHost = "https://www.swapi.tech/api"
  const navigate = useNavigate()
  const { store, dispatch } = useGlobalReducer()
  const [planets, setPlanets] = useState([])

  const handleDetails = (planeta) => {
    dispatch({
      type: "planet_details",
      payload: planeta,
    })
    navigate("/planet-details")
  }

  const handleFavorite = (planeta) => {
    const yaEstaEnFavoritos = store.favorites.some(fav => fav.uid === planeta.uid)
    
    if (yaEstaEnFavoritos) {
      dispatch({
        type: 'remove_favorite',
        payload: planeta
      })
    } else {
      dispatch({
        type: 'add_favorite',
        payload: { ...planeta, category: 'planet' }
      })
    }
  }

  const getPlanets = async () => {
    const guardados = localStorage.getItem("planets")
    if (guardados) {
      setPlanets(JSON.parse(guardados))
      return
    }

    const uri = `${swapiHost}/planets`
    const response = await fetch(uri)

    if (!response.ok) {
      console.log("Error:", response.status, response.statusText)
      return
    }

    const data = await response.json()
    localStorage.setItem("planets", JSON.stringify(data.results))
    setPlanets(data.results)
  }

  useEffect(() => {
    getPlanets()
  }, [])

  return (
    <div className="container mt-3">
      <h1 className="text-center">Planetas</h1>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-2">
        {planets.map((item) => (
          <div key={item.uid} className="col">
            <div className="card border-dark rounded my-3 mx-2 text-bg-dark">
              <img
                className="card-img-top"
                src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/planets/${item.uid}.jpg`}
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
  )
}