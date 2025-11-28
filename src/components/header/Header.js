import styled from 'styled-components';
import { Logo } from './Logo';
import { CharacterFilter } from './CharacterFilter';

export function Header({ onFiltersChange }) {
  return (
    <HeaderContainer>
      <Logo />
      <CharacterFilter onFiltersChange={onFiltersChange} />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: 950px) {
    justify-content: center;
    flex-direction: column;
  }

  @media (max-width: 530px) {
    flex-direction: column;
    gap: 30px;
  }
`;
