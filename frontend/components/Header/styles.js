import styled from 'styled-components'

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
`
export const StyledHeader = styled.header`
  .bar {
    background-color:white;
    border-bottom: 10px solid ${props => props.theme.black};
    display:flex;
    justify-content: space-between;
    align-items: stretch;
    padding:0 30px;
    align-items:center;
    @media (max-width: 1300px) {

      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.lightgrey};
  }
  button  {
    cursor:pointer;
    width: auto;
    background-color: ${props => props.theme.gsgreen};
    color: white;
    border: 0;
    height:5rem;
    border-radius:1rem;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
    @media (max-width: 1300px) {
      font-size:1rem;

      height:3rem;

}
  }
`
