import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const CharacterDetails = () => {
  const { store } = useGlobalReducer();
  const [details, setDetails] = useState(null);

  const getCharacterDetails = async () => {
    const response = await fetch(store.currentCharacter.url);

    if (!response.ok) {
      console.log("Error:", response.status, response.statusText);
      return;
    }

    const data = await response.json();
    setDetails(data.result.properties);
  };

  useEffect(() => {
    if (store.currentCharacter?.url) {
      getCharacterDetails();
    }
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Detalles del Personaje</h1>

      <div className="card bg-dark text-white">
        <div className="row g-0">
          <div className="col-md-5">
            <img
              src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/characters/${store.currentCharacter.uid}.jpg`}
              alt={store.currentCharacter.name}
              className="img-fluid h-100"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="col-md-7">
            <div className="card-body">
              {details && (
                <>
                  <h2 className="card-title">{details.name}</h2>

                  <p className="text-secondary">
                    Este es el resumen del personaje que has seleccionado.
                  </p>

                  <div className="row mt-4">
                    <div className="col-6 col-lg-4 mb-3">
                      <small className="text-secondary d-block">GÉNERO</small>
                      <span>{details.gender}</span>
                    </div>

                    <div className="col-6 col-lg-4 mb-3">
                      <small className="text-secondary d-block">ALTURA</small>
                      <span>{details.height}</span>
                    </div>

                    <div className="col-6 col-lg-4 mb-3">
                      <small className="text-secondary d-block">PESO</small>
                      <span>{details.mass}</span>
                    </div>

                    <div className="col-6 col-lg-4 mb-3">
                      <small className="text-secondary d-block">PELO</small>
                      <span>{details.hair_color}</span>
                    </div>

                    <div className="col-6 col-lg-4 mb-3">
                      <small className="text-secondary d-block">OJOS</small>
                      <span>{details.eye_color}</span>
                    </div>

                    <div className="col-6 col-lg-4 mb-3">
                      <small className="text-secondary d-block">NACIMIENTO</small>
                      <span>{details.birth_year}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
