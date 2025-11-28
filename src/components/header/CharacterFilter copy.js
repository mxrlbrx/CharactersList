import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

export function CharacterFilter({ onFiltersChange }) {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
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
          onFocus={() => setIsSelectOpen(true)}
          onBlur={() => setIsSelectOpen(false)}
          isOpen={isSelectOpen}
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

  @media (max-width: 950px) {
    display: grid;
    grid-template-columns: repeat(3, 150px);
    gap: 15px;
  }

  @media (max-width: 530px) {
    grid-template-columns: 1fr;
    width: 15rem;
  }
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
  padding: 12px 16px 10px;
  border: 1px solid #83bf46;
  border-radius: 8px;
  background: #263750;
  color: #b3b3b3 !important;
  font-size: 16px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 11.25rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  appearance: none;
  background-image: url('/icons/arrow_down.svg');
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  ${(props) =>
    props.isOpen &&
    `
      background-image: url('/icons/arrow_up.svg');
    `}

  @media (max-width: 950px) {
    justify-content: flex-start;
    width: 9.375rem;
    height: 2.5rem;
  }

  @media (max-width: 530px) {
    width: 15rem;
  }

  &:focus {
    outline: none;
    border-color: #83bf46;
    background-image: url('/icons/arrow_up.svg');
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 16px;
  }

  option {
    background: #263750;
    color: #b3b3b3;
    padding: 8px 12px;
    font-size: 14px;
    border: 1px solid #83bf46;
    border-radius: 8px;

    &:hover {
      background: #e6f2da;
    }
  }
`;

const Input = styled.input`
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
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;

  @media (max-width: 950px) {
    grid-column: span 2;
    justify-content: flex-start;
    width: 9.375rem;
    height: 2.5rem;
  }

  @media (max-width: 530px) {
    width: 15rem;
  }

  &:focus {
    outline: none;
    border-color: #83bf46;
  }

  &::placeholder {
    color: #b3b3b;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  align-items: flex-end;
  grid-column: 1 / -1;

  @media (max-width: 530px) {
    display: flex;
    flex-direction: column;
    width: 15rem;
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  border: 1px solid;
  border-radius: 8px;
  cursor: pointer;
  font-weight: regular;
  transition: all 0.2s;
  font-size: 16px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5.3125rem;
  height: 2.5rem;
  font-family: 'Inter', sans-serif;

  @media (max-width: 950px) {
    width: 4.375rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 530px) {
    width: 15rem;
  }
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
