import React, { useState, useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
`;

const FilterSection = styled.div`
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FilterTitle = styled.h2`
  margin-bottom: 15px;
  color: #333;
  font-size: 1.5rem;
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #42b983;
  }
`;

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #42b983;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;

  ${(props) =>
    props.primary
      ? css`
          background: #42b983;
          color: white;

          &:hover {
            background: #3aa876;
          }
        `
      : css`
          background: #6c757d;
          color: white;

          &:hover {
            background: #5a6268;
          }
        `}
`;

const CharactersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const CharacterCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CharacterImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CharacterInfo = styled.div`
  padding: 15px;
`;

const CharacterName = styled.h3`
  margin-bottom: 10px;
  color: #333;
`;

const CharacterDetail = styled.p`
  margin-bottom: 5px;
  color: #666;
  font-size: 14px;
`;

const StatusIndicator = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 5px;

  ${(props) => {
    switch (props.status) {
      case 'Alive':
        return css`
          background: #42b983;
        `;
      case 'Dead':
        return css`
          background: #dc3545;
        `;
      default:
        return css`
          background: #6c757d;
        `;
    }
  }}
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #dc3545;
  background: #f8d7da;
  border-radius: 8px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 30px;
`;

const PageButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: #f5f5f5;
  }
`;

const PageInfo = styled.span`
  color: #666;
  font-size: 14px;
`;

// Основной компонент
export function CharacterFilter({ setPopupSettings }) {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Состояния фильтров
  const [filters, setFilters] = useState({
    status: '',
    gender: '',
    species: '',
    name: '',
    type: ''
  });

  // Функция для загрузки персонажей с пагинацией
  const fetchCharacters = useCallback(
    async (page = 1) => {
      try {
        setLoading(true);

        // Создаем параметры запроса
        const queryParams = new URLSearchParams({
          page: page.toString()
        });

        // Добавляем фильтры в параметры запроса
        Object.entries(filters).forEach(([key, value]) => {
          if (value) {
            queryParams.append(key, value);
          }
        });

        const response = await fetch(
          `https://rickandmortyapi.com/api/character?${queryParams}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch characters');
        }

        const data = await response.json();

        setCharacters(data.results);
        setFilteredCharacters(data.results);
        setTotalPages(data.info.pages);
        setCurrentPage(page);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    },
    [filters]
  ); // Добавляем filters в зависимости

  // Функция для применения фильтров
  const applyFilters = useCallback(() => {
    setCurrentPage(1);
    fetchCharacters(1);
  }, [fetchCharacters]);

  // Сброс фильтров
  const handleReset = useCallback(() => {
    setFilters({
      status: '',
      gender: '',
      species: '',
      name: '',
      type: ''
    });
    setCurrentPage(1);
    // После сброса загружаем первую страницу
    setTimeout(() => fetchCharacters(1), 0);
  }, [fetchCharacters]);

  // Обработчик изменения фильтров
  const handleFilterChange = useCallback((filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value
    }));
  }, []);

  // Открытие попапа с информацией о персонаже
  const handleCharacterClick = useCallback(
    (character) => {
      if (setPopupSettings) {
        setPopupSettings({
          visible: true,
          content: character
        });
      }
    },
    [setPopupSettings]
  );

  // Пагинация
  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      fetchCharacters(currentPage + 1);
    }
  }, [currentPage, totalPages, fetchCharacters]);

  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) {
      fetchCharacters(currentPage - 1);
    }
  }, [currentPage, fetchCharacters]);

  // Загрузка первой страницы при монтировании
  useEffect(() => {
    fetchCharacters(1);
  }, [fetchCharacters]); // Добавляем fetchCharacters в зависимости

  // Обновляем данные при изменении фильтров
  useEffect(() => {
    fetchCharacters(1);
  }, [filters, fetchCharacters]);

  if (loading) {
    return (
      <LoadingMessage>
        Loading characters... (Page {currentPage})
      </LoadingMessage>
    );
  }

  if (error) {
    return (
      <ErrorMessage>
        Error: {error}
        <br />
        <Button
          onClick={() => fetchCharacters(1)}
          style={{ marginTop: '10px' }}
        >
          Try Again
        </Button>
      </ErrorMessage>
    );
  }

  return (
    <Container>
      <FilterSection>
        <FilterTitle>Character Filters</FilterTitle>

        <FilterGrid>
          <FilterGroup>
            <Label htmlFor="status">Status</Label>
            <Select
              id="status"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="">All</option>
              <option value="Alive">Alive</option>
              <option value="Dead">Dead</option>
              <option value="unknown">Unknown</option>
            </Select>
          </FilterGroup>

          <FilterGroup>
            <Label htmlFor="gender">Gender</Label>
            <Select
              id="gender"
              value={filters.gender}
              onChange={(e) => handleFilterChange('gender', e.target.value)}
            >
              <option value="">All</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Genderless">Genderless</option>
              <option value="unknown">Unknown</option>
            </Select>
          </FilterGroup>

          <FilterGroup>
            <Label htmlFor="species">Species</Label>
            <Select
              id="species"
              value={filters.species}
              onChange={(e) => handleFilterChange('species', e.target.value)}
            >
              <option value="">All</option>
              <option value="Human">Human</option>
              <option value="Alien">Alien</option>
              <option value="Humanoid">Humanoid</option>
              <option value="Robot">Robot</option>
              <option value="Animal">Animal</option>
              <option value="Mythological Creature">
                Mythological Creature
              </option>
            </Select>
          </FilterGroup>

          <FilterGroup>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter character name"
              value={filters.name}
              onChange={(e) => handleFilterChange('name', e.target.value)}
            />
          </FilterGroup>

          <FilterGroup>
            <Label htmlFor="type">Type</Label>
            <Input
              id="type"
              type="text"
              placeholder="Enter character type"
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
            />
          </FilterGroup>
        </FilterGrid>

        <ButtonGroup>
          <Button primary onClick={applyFilters}>
            Apply Filters
          </Button>
          <Button onClick={handleReset}>Reset Filters</Button>
        </ButtonGroup>
      </FilterSection>

      <div>
        <h2>
          Characters ({filteredCharacters.length}) - Page {currentPage} of{' '}
          {totalPages}
        </h2>

        {filteredCharacters.length === 0 ? (
          <LoadingMessage>
            No characters found with the selected filters.
          </LoadingMessage>
        ) : (
          <>
            <CharactersGrid>
              {filteredCharacters.map((character) => (
                <CharacterCard
                  key={character.id}
                  onClick={() => handleCharacterClick(character)}
                >
                  <CharacterImage src={character.image} alt={character.name} />
                  <CharacterInfo>
                    <CharacterName>{character.name}</CharacterName>
                    <CharacterDetail>
                      <StatusIndicator status={character.status} />
                      {character.status} - {character.species}
                    </CharacterDetail>
                    <CharacterDetail>
                      <strong>Gender:</strong> {character.gender}
                    </CharacterDetail>
                    {character.type && (
                      <CharacterDetail>
                        <strong>Type:</strong> {character.type}
                      </CharacterDetail>
                    )}
                    <CharacterDetail>
                      <strong>Location:</strong> {character.location.name}
                    </CharacterDetail>
                  </CharacterInfo>
                </CharacterCard>
              ))}
            </CharactersGrid>

            <Pagination>
              <PageButton onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous
              </PageButton>
              <PageInfo>
                Page {currentPage} of {totalPages}
              </PageInfo>
              <PageButton
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </PageButton>
            </Pagination>
          </>
        )}
      </div>
    </Container>
  );
}
