import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const StarshipDetails = () => {
  const { store } = useGlobalReducer();
  const [details, setDetails] = useState(null);

  const getStarshipDetails = async () => {
    const response = await fetch(store.currentStarship.url);

    if (!response.ok) {
      console.log("Error:", response.status, response.statusText);
      return;
    }

    const data = await response.json();
    setDetails(data.result.properties);
  };

  useEffect(() => {
    if (store.currentStarship?.url) {
      getStarshipDetails();
    }
  }, [store.currentStarship?.url]);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Detalles de la Nave</h1>

      <div className="card bg-dark text-white">
        <div className="row g-0">
          <div className="col-md-5">
            <img
              src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/starships/${store.currentStarship.uid}.jpg`}
              alt={store.currentStarship.name}
              className="img-fluid h-100"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="col-md-7">
            <div className="card-body">
              {details && (
                <>
                  <h2 className="card-title">{details.name}</h2>
                  <ul className="mt-3">
                    <li>
                      <strong>Modelo:</strong> {details.model}
                    </li>
                    <li>
                      <strong>Fabricante:</strong> {details.manufacturer}
                    </li>
                    <li>
                      <strong>Coste:</strong> {details.cost_in_credits} créditos
                    </li>
                    <li>
                      <strong>Longitud:</strong> {details.length} metros
                    </li>
                    <li>
                      <strong>Velocidad máxima:</strong> {details.max_atmosphering_speed}
                    </li>
                    <li>
                      <strong>Tripulación:</strong> {details.crew}
                    </li>
                    <li>
                      <strong>Pasajeros:</strong> {details.passengers}
                    </li>
                    <li>
                      <strong>Capacidad de carga:</strong> {details.cargo_capacity}
                    </li>
                    <li>
                      <strong>Clase:</strong> {details.starship_class}
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