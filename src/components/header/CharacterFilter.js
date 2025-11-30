import React, { useState, useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';

function CustomSelect({ id, value, onChange, children, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef();

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options = React.Children.toArray(children).filter(
    (child) => child.type === 'option'
  );

  const selectedOption = options.find((opt) => opt.props.value === value);
  const displayValue = selectedOption
    ? selectedOption.props.children
    : placeholder;

  const handleOptionClick = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleClearClick = (e) => {
    e.stopPropagation();
    onChange('');
  };

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SelectWrapper ref={wrapperRef}>
      <SelectButton
        type="button"
        $isOpen={isOpen}
        $hasValue={!!value}
        onClick={handleButtonClick}
      >
        {displayValue}

        {value && (
          <ClearButton
            type="button"
            onClick={handleClearClick}
            onMouseDown={(e) => e.preventDefault()}
          >
            <ClearIcon />
          </ClearButton>
        )}
      </SelectButton>

      {isOpen && (
        <Dropdown>
          {options.map((option) => (
            <Option
              key={option.props.value}
              $selected={option.props.value === value}
              onClick={() => handleOptionClick(option.props.value)}
            >
              {option.props.children}
            </Option>
          ))}
        </Dropdown>
      )}
    </SelectWrapper>
  );
}

export function CharacterFilter({ onFiltersChange }) {
  const [tempFilters, setTempFilters] = useState({
    status: '',
    gender: '',
    species: '',
    name: '',
    type: ''
  });

  const [activeFilters, setActiveFilters] = useState({});

  const handleTempFilterChange = useCallback((filterName, value) => {
    setTempFilters((prev) => ({
      ...prev,
      [filterName]: value
    }));
  }, []);

  const handleApply = useCallback(() => {
    setActiveFilters(tempFilters);
    onFiltersChange(tempFilters);
  }, [tempFilters, onFiltersChange]);

  const handleReset = useCallback(() => {
    const resetFilters = {
      status: '',
      gender: '',
      species: '',
      name: '',
      type: ''
    };
    setTempFilters(resetFilters);
    setActiveFilters(resetFilters);
    onFiltersChange(resetFilters);
  }, [onFiltersChange]);

  return (
    <FilterGrid>
      <FilterGroup>
        <CustomSelect
          id="status"
          value={tempFilters.status}
          onChange={(value) => handleTempFilterChange('status', value)}
          placeholder="Status"
        >
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </CustomSelect>
      </FilterGroup>

      <FilterGroup>
        <CustomSelect
          id="gender"
          value={tempFilters.gender}
          onChange={(value) => handleTempFilterChange('gender', value)}
          placeholder="Gender"
        >
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </CustomSelect>
      </FilterGroup>

      <FilterGroup>
        <CustomSelect
          id="species"
          value={tempFilters.species}
          onChange={(value) => handleTempFilterChange('species', value)}
          placeholder="Species"
        >
          <option value="Human">Human</option>
          <option value="Alien">Alien</option>
          <option value="Humanoid">Humanoid</option>
          <option value="Robot">Robot</option>
          <option value="Animal">Animal</option>
          <option value="Mythological Creature">Mythological Creature</option>
        </CustomSelect>
      </FilterGroup>

      <FilterGroup>
        <Input
          id="name"
          type="text"
          placeholder="Name"
          value={tempFilters.name}
          onChange={(e) => handleTempFilterChange('name', e.target.value)}
        />
      </FilterGroup>

      <FilterGroup>
        <Input
          id="type"
          type="text"
          placeholder="Type"
          value={tempFilters.type}
          onChange={(e) => handleTempFilterChange('type', e.target.value)}
        />
      </FilterGroup>

      <FilterGroup>
        <ButtonGroup>
          <ApplyButton onClick={handleApply}>Apply</ApplyButton>
          <ResetButton onClick={handleReset}>Reset</ResetButton>
        </ButtonGroup>
      </FilterGroup>
    </FilterGrid>
  );
}

// Все стили остаются без изменений...
const SelectWrapper = styled.div`
  position: relative;
  width: 11.25rem;

  @media (max-width: 950px) {
    width: 9.375rem;
  }

  @media (max-width: 530px) {
    width: 15rem;
  }
`;

const SelectButton = styled.button`
  padding: 12px 40px 12px 16px;
  border: 1px solid #83bf46;
  border-radius: 8px;
  background: #263750;
  color: #b3b3b3;
  font-size: 16px;
  width: 100%;
  height: 2.5rem;
  font-family: 'Inter', sans-serif;
  text-align: left;
  cursor: pointer;
  appearance: none;
  transition: all 0.2s;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-image: ${(props) =>
    props.$hasValue
      ? 'none'
      : props.$isOpen
      ? "url('/icons/arrow_up.svg')"
      : "url('/icons/arrow_down.svg')"};
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;

  ${(props) =>
    props.$isOpen &&
    `
    border-color: #83bf46;
    box-shadow: 0 0 0 2px rgba(131, 191, 70, 0.2);
  `}

  ${(props) =>
    props.$hasValue &&
    `
    color: #fff;
    border-color: #83bf46;
    padding-right: 40px;
  `}

  &:focus {
    outline: none;
    border-color: #83bf46;
    box-shadow: 0 0 0 2px rgba(131, 191, 70, 0.2);
  }

  &:hover {
    border-color: #83bf46;
    background-color: #2a3a54;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  color: #b3b3b3;
  transition: color 0.2s;

  &:hover {
    color: #83bf46;
  }

  &:focus {
    outline: none;
  }
`;

const ClearIcon = styled.div`
  width: 16px;
  height: 16px;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: 2px;
    background: currentColor;
    border-radius: 1px;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #263750;
  border: 1px solid #83bf46;
  border-radius: 8px;
  z-index: 1000;
  margin-top: 4px;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

const Option = styled.div`
  padding: 12px 16px;
  background-color: #fff;
  color: #1e1e1e;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s;
  font-weight: ${(props) => (props.$selected ? 'bold' : 'normal')};

  &:hover {
    background-color: #e6f2da;
    color: #1e1e1e;
  }

  ${(props) =>
    props.$selected &&
    `
    color: #1e1e1e;
    font-weight: bold;
  `}
`;

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
