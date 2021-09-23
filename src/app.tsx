import { useRef } from 'react'

import { Content } from 'components/content'
import { Sidebar } from 'components/sidebar'

import styled from 'styled-components/macro'

function App () {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <Wrapper>
      <Sidebar inputRef={inputRef} />
      <Content inputRef={inputRef} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
`

export { App }
