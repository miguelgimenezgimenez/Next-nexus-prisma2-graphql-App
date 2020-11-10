import styled from 'styled-components';

export const StyledPage = styled.div`
  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.black};
`;

export const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;
