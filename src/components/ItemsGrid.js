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
  const { characters, applyFilters, currentFilters } = useData();
  const [popupSettings, setPopupSettings] = useState(defaultPopupSettings);

  // Применяем фильтры при их изменении
  useEffect(() => {
    const filtersChanged =
      JSON.stringify(filters) !== JSON.stringify(currentFilters);

    if (filtersChanged) {
      applyFilters(filters);
    }
  }, [filters, applyFilters, currentFilters]);

  function cardOnClickHandler(props) {
    setPopupSettings({
      visible: true,
      content: { ...props }
    });
  }

  if (!characters.length) {
    return <EmptyMessage>No characters found</EmptyMessage>;
  }

  return (
    <>
      <Container>
        {characters.map((props, index) => (
          <Card
            key={`${props.id}-${index}`}
            onClickHandler={() => cardOnClickHandler(props)}
            {...props}
          />
        ))}
      </Container>

      <Popup settings={popupSettings} setSettings={setPopupSettings} />
    </>
  );
}

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  justify-items: center;
  gap: 30px;
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: #666;
  font-size: 18px;
  padding: 40px;
`;
