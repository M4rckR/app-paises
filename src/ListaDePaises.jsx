import { useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { PaisSeleccionado } from "./views/PaisSeleccionado";

const OBTENER_PAISES = gql`
  query GetCountries {
    countries {
      code
      name
      capital
      languages {
        name
      }
      currency
      continent {
        name
      }
    }
  }
`;

export const ListaDePaises = () => {
  const { loading, error, data } = useQuery(OBTENER_PAISES);
  const [valorBusqueda, setValorBusqueda] = useState("");
  const [continenteSeleccionado, setContinenteSeleccionado] = useState("");
  const [paisSeleccionado, setPaisSeleccionado] = useState(null);
  const [banderas, setBanderas] = useState([]);
  const [imagenesPais, setImagenesPais] = useState({});

  // URL de la bandera predeterminada
  const banderaPredeterminada =
    "https://via.placeholder.com/100x60?text=No+Bandera";

  useEffect(() => {
    const obtenerBanderas = async () => {
      try {
        const respuesta = await fetch("https://restcountries.com/v3.1/all");
        const datos = await respuesta.json();
        setBanderas(datos);
      } catch (err) {
        console.error("Error al obtener las banderas:", err);
      }
    };
    obtenerBanderas();
  }, []);

  const obtenerImagenPais = async (nombrePais) => {
    try {
      const respuesta = await fetch(
        `https://api.unsplash.com/search/photos?query=${nombrePais}&client_id=-FitqvqziUhSA1faFTpimcHTfYnw27XwbrRRtee2nWk`
      );
      const datos = await respuesta.json();
      if (datos.results && datos.results.length > 0) {
        return datos.results[0].urls.small;
      }
      return "https://via.placeholder.com/300x200?text=No+Image";
    } catch (err) {
      console.error("Error al obtener la imagen:", err);
      return "https://via.placeholder.com/300x200?text=No+Image";
    }
  };

  useEffect(() => {
    if (data && data.countries) {
      const cargarImagenesConcurrentes = async () => {
        const promesasImagenes = data.countries.map(async (country) => {
          const imagen = await obtenerImagenPais(country.name);
          return { [country.name]: imagen };
        });

        const resultados = await Promise.all(promesasImagenes);

        const nuevasImagenes = resultados.reduce((acumulado, resultado) => {
          return { ...acumulado, ...resultado };
        }, {});

        setImagenesPais(nuevasImagenes);
      };

      cargarImagenesConcurrentes();
    }
  }, [data]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al hacer la carga: {error.message}</p>;

  const obtenerBandera = (nombrePais) => {
    const paisConBandera = banderas.find(
      (banderaPais) => banderaPais.name.common === nombrePais
    );
    return paisConBandera ? paisConBandera.flags.png : banderaPredeterminada;
  };


  const paisesFiltrados = data.countries.filter((country) => {
    const matchesSearch = country.name
      .toLowerCase()
      .includes(valorBusqueda.toLowerCase());
    const matchContinente = continenteSeleccionado
      ? country.continent.name === continenteSeleccionado
      : true;
    return matchesSearch && matchContinente;
  });

  return (
    <>
      <div className="pb-14 px-10 ">
        <div className="flex items-center w-1/2 gap-2">
          <input
            type="text"
            placeholder="Buscar país..."
            value={valorBusqueda}
            className="border border-black p-2 w-full outline-none rounded-lg"
            onChange={(e) => setValorBusqueda(e.target.value)}
          />

          <select
            className="w-full block outline-none shadow-md rounded-lg p-2 mt-4 bg-gray-600 text-white mb-4"
            value={continenteSeleccionado}
            onChange={(e) => setContinenteSeleccionado(e.target.value)}
          >
            <option value="">Todos los continentes</option>
            {[
              ...new Set(
                data.countries.map((country) => country.continent.name)
              ),
            ].map((continent, index) => (
              <option key={index} value={continent}>
                {continent}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paisesFiltrados.map((country) => (
              <div
                className="border border-black  w-full rounded-2xl shadow-md cursor-pointer bg-m-purple text-white"
                key={country.code}
                onClick={() => setPaisSeleccionado(country)}
              >
                {imagenesPais[country.name] && (
                  <img
                    src={imagenesPais[country.name]}
                    alt={`Imagen representativa de ${country.name}`}
                    className="w-full h-40 object-cover rounded-t-2xl"
                  />
                )}
                <div className="flex items-center gap-4 py-2 px-4">
                  <img
                    src={obtenerBandera(country.name)}
                    alt={`Bandera de ${country.name}`}
                    style={{ width: "50px", height: "auto" }}
                  />
                  <div className="flex flex-col">
                    <h3>{country.name}</h3>
                    <p>{country.continent.name}</p>
                  </div>
                </div>
              </div>
            ))}
          {paisSeleccionado ? (
          <div>
            <PaisSeleccionado country={paisSeleccionado} />
          </div>
          
        ) : (
          <p className="mt-4 font-bold">
            Selecciona un país para ver los detalles
          </p>
        )}
        </div>
      </div>
      <div style={{ flex: 1, marginLeft: "20px" }}>
        
      </div>
    </>
  );
};
