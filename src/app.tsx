import { Content } from 'components/content'
import { Sidebar } from 'components/sidebar'

import styled from 'styled-components/macro'

function App () {
  return (
    <Wrapper>
      <Sidebar />
      <Content />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
`

export { App }
