/* eslint-disable react/prop-types */
export const PaisSeleccionado = ({ country }) => {
    return (
      <div className="country-detail">
        <h2>{country.name}</h2>
        <p>Capital: {country.capital}</p>
        <p>Moneda: {country.currency}</p>
        <p>Idiomas: {country.languages.map((lang) => lang.name).join(', ')}</p>
      </div>
    );
  };