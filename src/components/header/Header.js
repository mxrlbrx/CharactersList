import styled from 'styled-components';
import { useState } from 'react';
import { Logo } from './Logo';
import { CharacterFilter } from '../CharacterFilter/CharacterFilter';

export function Header({ setPopupSettings }) {
  return (
    <HeaderContainer>
      <Logo />
      <CharacterFilter setPopupSettings={setPopupSettings} />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
