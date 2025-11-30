import styled from 'styled-components';
import { Loader, Text } from './common';
import { useData } from './providers';

export function AppState() {
  const { isFetching, isError } = useData();

  if (isError) {
    return (
      <AppStateContainer>
        <Text>Characters not found</Text>
      </AppStateContainer>
    );
  }

  if (isFetching) {
    return (
      <AppStateContainer>
        <Loader />
      </AppStateContainer>
    );
  }

  return null;
}

const AppStateContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
