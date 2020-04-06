import styled from 'styled-components'

const Logo = styled.a`
  font-size: 2em;
  text-shadow: 0.08em 0.08em ${({ theme }) => theme.colors.purple};
  text-decoration: none;
`

export default () => (
  <Logo className="flex justify-center white mb4" href="/">
    Corona Tally
  </Logo>
)
