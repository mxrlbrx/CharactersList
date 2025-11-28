import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

export function CharacterFilter({ onFiltersChange }) {
  const [filters, setFilters] = useState({
    status: '',
    gender: '',
    species: '',
    name: '',
    type: ''
  });

  const handleFilterChange = useCallback(
    (filterName, value) => {
      const newFilters = {
        ...filters,
        [filterName]: value
      };
      setFilters(newFilters);
      onFiltersChange(newFilters);
    },
    [filters, onFiltersChange]
  );

  const handleReset = useCallback(() => {
    const resetFilters = {
      status: '',
      gender: '',
      species: '',
      name: '',
      type: ''
    };
    setFilters(resetFilters);
    onFiltersChange(resetFilters);
  }, [onFiltersChange]);

  return (
    <FilterContainer>
      <FilterGrid>
        <FilterGroup>
          <Label htmlFor="status">Status</Label>
          <Select
            id="status"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="">All</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
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
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="genderless">Genderless</option>
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
            <option value="Mythological Creature">Mythological Creature</option>
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

        {/* Кнопки размещаем в той же сетке после поля type */}
        <ButtonGroup>
          <ApplyButton onClick={() => onFiltersChange(filters)}>
            Apply
          </ApplyButton>
          <ResetButton onClick={handleReset}>Reset</ResetButton>
        </ButtonGroup>
      </FilterGrid>
    </FilterContainer>
  );
}

const FilterContainer = styled.div`
  background: #263750;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1200px;
  border: 1px solid #83bf46;
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 0;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  color: #fff;
  font-size: 14px;
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #83bf46;
  border-radius: 4px;
  background: #263750;
  color: #fff;
  font-size: 14px;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'><path fill='%2383BF46' d='M2 0L0 2h4zm0 5L0 3h4z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 8px 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  &:focus {
    outline: none;
    border-color: #83bf46;
  }

  option {
    background: #fff;
    color: #000;

    &:hover {
      background: #e6f2da;
    }
  }
`;

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #83bf46;
  border-radius: 4px;
  background: #263750;
  color: #fff;
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  &:focus {
    outline: none;
    border-color: #83bf46;
  }

  &::placeholder {
    color: #aaa;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  align-items: flex-end;
  grid-column: 1 / -1;

  @media (min-width: 768px) {
    grid-column: span 2;
    justify-content: flex-start;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border: 2px solid;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
  font-size: 14px;
  background: transparent;
`;

const ApplyButton = styled(Button)`
  border-color: #83bf46;
  color: #83bf46;

  &:hover {
    background: #83bf46;
    color: white;
  }
`;

const ResetButton = styled(Button)`
  border-color: #ff5152;
  color: #ff5152;

  &:hover {
    background: #ff5152;
    color: white;
  }
`;
