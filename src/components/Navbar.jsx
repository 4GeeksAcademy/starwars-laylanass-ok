import { useNavigate } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"

export const Navbar = () => {

  const { store, dispatch } = useGlobalReducer()
const navigate = useNavigate()

const handleRemoveFavorite = (item) => {
  dispatch({
    type: 'remove_favorite',
    payload: item
  })
}

const handleGoToDetails = (item) => {
  if (item.category === 'character') {
    dispatch({ type: 'character_details', payload: item })
    navigate('/character-details')
  } else if (item.category === 'planet') {
    dispatch({ type: 'planet_details', payload: item })
    navigate('/planet-details')
  } else if (item.category === 'starship') {
    dispatch({ type: 'starship_details', payload: item })
    navigate('/starship-details')
  }
}

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">

        <a className="navbar-brand" href="/">Star Wars</a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">

          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active" href="/characters">Characters</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/planets">Planets</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/starships">Starships</a>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
               Favorites ({store.favorites.length})
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
  {store.favorites.length === 0 ? (
    <li><span className="dropdown-item text-muted">No favorites yet</span></li>
  ) : (
    store.favorites.map((item) => (
      <li key={item.uid}>
        <a className="dropdown-item d-flex justify-content-between" href="#">
          <span onClick={() => handleGoToDetails(item)} style={{cursor: 'pointer'}}>{item.name}</span>
          <button 
            className="btn btn-sm btn-warning ms-3"
            onClick={() => handleRemoveFavorite(item)}
          >
            X
          </button>
        </a>
      </li>
    ))
  )}
</ul>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  );
};
