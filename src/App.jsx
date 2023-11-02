import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [cardData, setCardData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await axios.get(`https://api.scryfall.com/cards/named?fuzzy=${searchTerm}`);
        setCardData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (searchTerm) {
      fetchCardData();
    }
  }, [searchTerm]);

  return (
    <div>
      <h1>Buscar Tarjeta</h1>
      <input
        type="text"
        placeholder="Nombre de la tarjeta"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {cardData ? (
        <div>
          <h2>Información de la tarjeta:</h2>
          <p>Nombre: {cardData.name}</p>
          <p>Tipo: {cardData.type_line}</p>
          {cardData.image_uris && (
            <div>
              <h2>Imagen de la tarjeta:</h2>
              <img src={cardData.image_uris.normal} alt={cardData.name} />
            </div>
          )}
        </div>
      ) : (
        <p>Ingresa un nombre de tarjeta para buscar.</p>
      )}
    </div>
  );
}

export default App;
