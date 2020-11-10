import styled from 'styled-components';

export const Logo = styled.div`
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  padding:2rem;
  a {
    img {
      width:20rem;
    }

  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;
export const StyledHeader = styled.header`
  .bar {
    background-color:white;
    border-bottom: 10px solid ${props => props.theme.black};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.lightgrey};
  }
`;
