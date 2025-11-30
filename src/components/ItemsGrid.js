import { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Popup } from './popup';
import { useData } from './providers';
import { Card } from './card/Card';

const defaultPopupSettings = {
  visible: false,
  content: {}
};

// кэш для отслеживания неудачных загрузок изображений
const failedImageCache = new Set();

export function ItemsGrid({ filters = {} }) {
  const {
    characters,
    applyFilters,
    currentFilters,
    loading,
    error
  } = useData();
  const [popupSettings, setPopupSettings] = useState(defaultPopupSettings);
  const [retryTrigger, setRetryTrigger] = useState(0);

  // мемоизированная функция применения фильтров
  const filtersChanged = useMemo(() => {
    return JSON.stringify(filters) !== JSON.stringify(currentFilters);
  }, [filters, currentFilters]);

  // применяем фильтры при их изменении
  useEffect(() => {
    if (filtersChanged) {
      applyFilters(filters);
    }
  }, [filters, applyFilters, filtersChanged]);

  // фнкция для повторной загрузки всех изображений
  const retryFailedImages = useCallback(() => {
    failedImageCache.clear();
    setRetryTrigger((prev) => prev + 1);
  }, []);

  const cardOnClickHandler = useCallback((props) => {
    setPopupSettings({
      visible: true,
      content: { ...props }
    });
  }, []);

  // обработчик ошибок изображений
  const handleImageError = useCallback((characterId) => {
    failedImageCache.add(characterId);
  }, []);

  // функция рендеринга карточек
  const renderedCards = useMemo(() => {
    return characters.map((props, index) => (
      <Card
        key={`${props.id}-${index}-${retryTrigger}`}
        onClickHandler={() => cardOnClickHandler(props)}
        onImageError={() => handleImageError(props.id)}
        hasImageFailed={failedImageCache.has(props.id)}
        retryTrigger={retryTrigger}
        {...props}
      />
    ));
  }, [characters, cardOnClickHandler, handleImageError, retryTrigger]);

  // состояния загрузки и ошибок
  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner>⟳</LoadingSpinner>
        <div>Loading characters...</div>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <ErrorMessage>Error loading characters: {error}</ErrorMessage>
        <RetryButton onClick={() => applyFilters(filters)}>
          Try Again
        </RetryButton>
      </ErrorContainer>
    );
  }

  if (!characters.length) {
    return (
      <EmptyState>
        <EmptyMessage>No characters found</EmptyMessage>
        <EmptySubtitle>Try adjusting your filters</EmptySubtitle>
        <RetryButton onClick={() => applyFilters({})}>
          Reset Filters
        </RetryButton>
      </EmptyState>
    );
  }

  return (
    <>
      {failedImageCache.size > 0 && (
        <FailedImagesBanner>
          <span>{failedImageCache.size} image(s) failed to load</span>
          <RetryButton onClick={retryFailedImages}>
            Retry Failed Images
          </RetryButton>
        </FailedImagesBanner>
      )}

      <Container>{renderedCards}</Container>

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
  padding: 20px 0;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #666;
  gap: 20px;
`;

const LoadingSpinner = styled.div`
  font-size: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  gap: 20px;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  gap: 15px;
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: #666;
  font-size: 18px;
  font-weight: bold;
`;

const EmptySubtitle = styled.div`
  text-align: center;
  color: #888;
  font-size: 14px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: #e74c3c;
  font-size: 16px;
`;

const RetryButton = styled.button`
  background: #83bf46;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;

  &:hover {
    background: #72a83d;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const FailedImagesBanner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff3cd;
  color: #856404;
  padding: 12px 20px;
  border-radius: 6px;
  margin-bottom: 20px;
  border: 1px solid #ffeaa7;
  font-size: 14px;
`;
