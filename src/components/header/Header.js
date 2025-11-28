import styled from 'styled-components';
import { Logo } from './Logo';
import { CharacterFilter } from './CharacterFilter';

export function Header({ onFiltersChange }) {
  return (
    <HeaderContainer>
      <ContentWrapper>
        <Logo />
        <CharacterFilter onFiltersChange={onFiltersChange} />
      </ContentWrapper>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;

  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0 20px;
`;
