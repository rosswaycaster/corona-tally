import styled from 'styled-components'

const Footer = styled.div`
  opacity: 0.2;
  font-size: 0.8em;

  & a {
    color: white;
    text-decoration-color: rgba(250, 250, 250, 0.25);
  }
`

export default () => (
  <Footer className="flex flex-column flex-row-l justify-center pt4">
    <div className="ph2 pv1 pv0-l ml1 br-l">
      created by <a href="https://rosswaycaster.com">ross waycaster</a>
    </div>
    <div className="ph2-l pv1 pv0-l">
      data by{' '}
      <a href="https://github.com/CSSEGISandData/COVID-19">johns hopkins</a>
    </div>
  </Footer>
)
