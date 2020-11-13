import styled from 'styled-components'

export const StyledPage = styled.div`
  color: ${props => props.theme.black};
  height:100%;
`

export const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`
