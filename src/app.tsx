import { useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Content } from 'components/content'
import { Sidebar } from 'components/sidebar'

import styled from 'styled-components/macro'

export type File = {
  id: string
  name: string
  content: string
  active: boolean
  status: 'editing' | 'saving' | 'saved'
}

const initialFile: File = {
  id: uuidv4(),
  name: 'Sem título',
  content: '',
  active: true,
  status: 'saved',
}

function App () {
  const inputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<File[]>([initialFile])

  return (
    <Wrapper>
      <Sidebar inputRef={inputRef} files={files} setFiles={setFiles} />
      <Content inputRef={inputRef} files={files} setFiles={setFiles} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
`

export { App }
