import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const PlanetDetails = () => {
  const { store } = useGlobalReducer();
  const [details, setDetails] = useState(null);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const getPlanetDetails = async () => {
    const response = await fetch(store.currentPlanet.url);

    if (!response.ok) {
      console.log("Error:", response.status, response.statusText);
      return;
    }

    const data = await response.json();
    setDetails(data.result.properties);
  };

  useEffect(() => {
    if (store.currentPlanet?.url) {
      getPlanetDetails();
    }
  }, [store.currentPlanet?.url]);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Detalles del Planeta</h1>

      <div className="card bg-dark text-white">
        <div className="row g-0">
          <div className="col-md-5">
            <img
              src={imageError 
                ? "https://upload.wikimedia.org/wikipedia/commons/d/da/Imagen_no_disponible.svg"
                : `https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/planets/${store.currentPlanet.uid}.jpg`
              }
              alt={store.currentPlanet.name}
              className="img-fluid h-100"
              style={{ objectFit: "cover" }}
              onError={handleImageError}
            />
          </div>

          <div className="col-md-7">
            <div className="card-body">
              {details && (
                <>
                  <h2 className="card-title">{details.name}</h2>
                  <ul className="mt-3">
                    <li>
                      <strong>Clima:</strong> {details.climate}
                    </li>
                    <li>
                      <strong>Terreno:</strong> {details.terrain}
                    </li>
                    <li>
                      <strong>Población:</strong> {details.population}
                    </li>
                    <li>
                      <strong>Diámetro:</strong> {details.diameter}
                    </li>
                    <li>
                      <strong>Gravedad:</strong> {details.gravity}
                    </li>
                    <li>
                      <strong>Periodo orbital:</strong> {details.orbital_period}
                    </li>
                    <li>
                      <strong>Periodo rotación:</strong> {details.rotation_period}
                    </li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
