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
      </FilterGrid>

      <ButtonGroup>
        <ApplyButton onClick={() => onFiltersChange(filters)}>
          Apply
        </ApplyButton>
        <ResetButton onClick={handleReset}>Reset</ResetButton>
      </ButtonGroup>
    </FilterContainer>
  );
}

const FilterContainer = styled.div`
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1200px;
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
  font-size: 14px;
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
  justify-content: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
  font-size: 14px;
`;

const ApplyButton = styled(Button)`
  background: #42b983;
  color: white;

  &:hover {
    background: #3aa876;
  }
`;

const ResetButton = styled(Button)`
  background: #6c757d;
  color: white;

  &:hover {
    background: #5a6268;
  }
`;
