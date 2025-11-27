import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Popup } from './popup';
import { useData } from './providers';
import { Card } from './card/Card';

const defaultPopupSettings = {
  visible: false,
  content: {}
};

export function ItemsGrid({ filters = {} }) {
  const { characters } = useData();
  const [popupSettings, setPopupSettings] = useState(defaultPopupSettings);
  const [filteredCharacters, setFilteredCharacters] = useState([]);

  // Применение фильтров при изменении characters или filters
  useEffect(() => {
    let filtered = characters;

    if (filters.status) {
      filtered = filtered.filter(
        (char) => char.status.toLowerCase() === filters.status.toLowerCase()
      );
    }

    if (filters.gender) {
      filtered = filtered.filter(
        (char) => char.gender.toLowerCase() === filters.gender.toLowerCase()
      );
    }

    if (filters.species) {
      filtered = filtered.filter((char) => char.species === filters.species);
    }

    if (filters.name) {
      filtered = filtered.filter((char) =>
        char.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.type) {
      filtered = filtered.filter((char) =>
        char.type.toLowerCase().includes(filters.type.toLowerCase())
      );
    }

    setFilteredCharacters(filtered);
  }, [characters, filters]);

  function cardOnClickHandler(props) {
    setPopupSettings({
      visible: true,
      content: { ...props }
    });
  }

  if (!characters.length) {
    return null;
  }

  const displayCharacters = Object.keys(filters).some((key) => filters[key])
    ? filteredCharacters
    : characters;

  return (
    <Container>
      {displayCharacters.map((props, index) => (
        <Card
          key={index}
          onClickHandler={() => cardOnClickHandler(props)}
          {...props}
        />
      ))}

      <Popup settings={popupSettings} setSettings={setPopupSettings} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  justify-items: center;
  gap: 30px;
`;
