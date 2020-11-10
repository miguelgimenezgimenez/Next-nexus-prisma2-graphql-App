import styled, { keyframes } from 'styled-components';


export const Title = styled.h3`
margin: 0 1rem;
text-align: center;
/* text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1); */
a {
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  
  display: inline;
  line-height: 1.3;
  font-size: 3rem;
  text-align: center;
  color: #000;
  padding: 0 1rem;
}
`;


export const Center = styled.div`
text-align: center;
`;

export const ItemsList = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
grid-gap: 60px;
max-width: ${props => props.theme.maxWidth};
margin: 0 auto;
`;

export const Form = styled.form`
box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
background: rgba(0, 0, 0, 0.02);
border: 5px solid white;
padding: 20px;
font-size: 1.5rem;
line-height: 1.5;
font-weight: 600;
label {
  display: block;
  margin-bottom: 1rem;
}
input,
textarea,
select {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid black;
  &:focus {
    outline: 0;
    border-color: ${props => props.theme.gsgreen};
  }
}
button,
input[type='submit'] {
  width: auto;
  background-color: ${props => props.theme.gsgreen};
  color: white;
  border: 0;
  font-size: 2rem;
  font-weight: 600;
  padding: 0.5rem 1.2rem;
}
fieldset {
  border: 0;
  padding: 0;

  &[disabled] {
    opacity: 0.5;
  }
 
}
`;