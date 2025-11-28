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
    <FilterGrid>
      <FilterGroup>
        <Select
          id="status"
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
        >
          <option value="">Status</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </Select>
      </FilterGroup>

      <FilterGroup>
        <Select
          id="gender"
          value={filters.gender}
          onChange={(e) => handleFilterChange('gender', e.target.value)}
        >
          <option value="">Gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </Select>
      </FilterGroup>

      <FilterGroup>
        <Select
          id="species"
          value={filters.species}
          onChange={(e) => handleFilterChange('species', e.target.value)}
        >
          <option value="">Species</option>
          <option value="Human">Human</option>
          <option value="Alien">Alien</option>
          <option value="Humanoid">Humanoid</option>
          <option value="Robot">Robot</option>
          <option value="Animal">Animal</option>
          <option value="Mythological Creature">Mythological Creature</option>
        </Select>
      </FilterGroup>

      <FilterGroup>
        <Input
          id="name"
          type="text"
          placeholder="Name"
          value={filters.name}
          onChange={(e) => handleFilterChange('name', e.target.value)}
        />
      </FilterGroup>

      <FilterGroup>
        <Input
          id="type"
          type="text"
          placeholder="Type"
          value={filters.type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
        />
      </FilterGroup>

      <FilterGroup>
        <ButtonGroup>
          <ApplyButton onClick={() => onFiltersChange(filters)}>
            Apply
          </ApplyButton>
          <ResetButton onClick={handleReset}>Reset</ResetButton>
        </ButtonGroup>
      </FilterGroup>
    </FilterGrid>
  );
}

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 180px);
  gap: 10px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  color: #fff;
  font-size: 14px;
`;

const Select = styled.select`
  padding: 12px 16px 12px;
  border: 1px solid #83bf46;
  border-radius: 8px;
  background: #263750;
  color: #fff;
  font-size: 16px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 11.25rem;
  height: 2.5rem;

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
  padding: 12px 16px 12px;
  border: 1px solid #83bf46;
  border-radius: 4px;
  background: #263750;
  color: #fff;
  font-size: 16px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 11.25rem;
  height: 2.5rem;

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
  border: 1px solid;
  border-radius: 8px;
  cursor: pointer;
  font-weight: regular;
  transition: all 0.2s;
  font-size: 16px;
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
