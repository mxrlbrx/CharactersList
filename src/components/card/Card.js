import styled from 'styled-components';
import { CardTitle } from './CardTitle';
import { CardStatus } from './CardStatus';
import { useState, useEffect, useRef } from 'react';

export function Card({
  status,
  name,
  species,
  type,
  gender,
  image,
  onClickHandler,
  onImageError,
  hasImageFailed,
  retryTrigger
}) {
  const [imageError, setImageError] = useState(hasImageFailed || false);
  const [imageLoading, setImageLoading] = useState(!hasImageFailed);
  const [retryCount, setRetryCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.1
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (retryTrigger > 0) {
      setImageError(false);
      setImageLoading(true);
      setRetryCount(0);
    }
  }, [retryTrigger]);

  useEffect(() => {
    if (hasImageFailed) {
      setImageError(true);
      setImageLoading(false);
    }
  }, [hasImageFailed]);

  const handleImageError = () => {
    if (retryCount < 3) {
      // автоматическая повторная попытка загрузки
      setTimeout(() => {
        setRetryCount((prev) => prev + 1);
        setImageError(false);
        setImageLoading(true);
      }, 1000 * retryCount);
    } else {
      setImageError(true);
      setImageLoading(false);
      onImageError?.();
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  // принудительная перезагрузка изображения
  const retryLoadImage = (e) => {
    e.stopPropagation();
    setRetryCount(0);
    setImageError(false);
    setImageLoading(true);
  };

  return (
    <StyledCard onClick={onClickHandler} ref={cardRef}>
      <ImageContainer>
        {imageLoading && (
          <ImagePlaceholder>
            <LoadingSpinner>⟳</LoadingSpinner>
            Loading...
          </ImagePlaceholder>
        )}

        {!imageError && isInView ? (
          <CardImg
            src={retryCount > 0 ? `${image}?retry=${retryCount}` : image}
            alt={name}
            onError={handleImageError}
            onLoad={handleImageLoad}
            style={{ display: imageLoading ? 'none' : 'block' }}
            loading="lazy"
          />
        ) : imageError ? (
          <ImagePlaceholder>
            <div>No Image</div>
            <RetryButton onClick={retryLoadImage}>Try Again</RetryButton>
          </ImagePlaceholder>
        ) : (
          <ImagePlaceholder>
            <LoadingSpinner>⟳</LoadingSpinner>
            Loading...
          </ImagePlaceholder>
        )}
      </ImageContainer>

      <CardInfo>
        <CardTitle name={name} gender={gender} />
        <CardStatus status={status} species={species} type={type} />
      </CardInfo>
    </StyledCard>
  );
}

const StyledCard = styled.div`
  display: flex;
  width: 100%;
  max-width: 400px;
  flex-direction: column;
  background: #263750;
  border-radius: 10px;
  transition: transform 0.3s, box-shadow 0.3s;
  overflow: hidden;

  &:hover {
    cursor: pointer;
    transform: scale(1.01);
    box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.2);
  }

  &:hover .card-title {
    color: #83bf46;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 10px 10px 0 0;
  overflow: hidden;
  background: #1a2838;
`;

const CardImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s;
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #1a2838;
  color: #666;
  font-size: 14px;
  gap: 10px;
`;

const LoadingSpinner = styled.div`
  font-size: 20px;
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

const RetryButton = styled.button`
  background: #83bf46;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background: #72a83d;
  }
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
  padding: 20px;
`;
