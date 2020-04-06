import styled from 'styled-components'
import * as addCommas from 'comma-number'
import useSortByFilter from '../hooks/useSortByFilter'
import useAnalytics from '../hooks/useAnalytics'
import classnames from 'classnames'

const Card = styled.div`
  flex: 1 1;
  outline: none;
  background-color: ${({ theme }) => theme.colors.midPurple};

  &.selected {
    box-shadow: 0.15em 0.15em ${({ theme }) => theme.colors.purple};
  }
`

const Title = styled.div`
  font-size: 0.8em;
`

const Count = styled.div`
  font-size: 1.8em;
`

export default ({ title, emoji, count }) => {
  const [sortByFilter, setSortByFilter] = useSortByFilter()
  const { trackEvent } = useAnalytics()

  const handleOnClick = () => {
    setSortByFilter(title)
    trackEvent({
      category: 'World Stats Clicked',
      action: title,
    })
  }
  return (
    <Card
      role="button"
      tabIndex="1"
      className={classnames(
        'tc ma3 mh3 br3 pa3 pointer',
        sortByFilter === title && 'selected'
      )}
      onClick={handleOnClick}
    >
      <Title>
        {title} {emoji}
      </Title>
      <Count className="pt2">{addCommas(count) || '-----'}</Count>
    </Card>
  )
}
