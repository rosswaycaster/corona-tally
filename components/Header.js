import styled from 'styled-components'

const Header = styled.div`
  font-size: 1.8em;
  color: white;
  text-align: center;
  margin-top: 0.5em;
`

const SubHeader = styled.div`
  text-align: center;
  font-size: 0.8em;
  opacity: 0.25;
`

export default ({ title, subHeader, ...restProps }) => {
  return (
    <div {...restProps}>
      <Header>{title}</Header>
      <SubHeader>{subHeader}</SubHeader>
    </div>
  )
}
