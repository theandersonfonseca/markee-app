import { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Content } from 'components/content'
import { Sidebar } from 'components/sidebar'

import styled from 'styled-components/macro'

type FileStatus = 'editing' | 'saving' | 'saved'

export type File = {
  id: string
  name: string
  content: string
  active: boolean
  status: FileStatus
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

  useEffect(() => {
    const activeFile = files.filter(file => file.active)[0]

    if (activeFile.status !== 'editing') return

    const fileStatusTimeout: ReturnType<typeof setTimeout> = setTimeout(() => {
      setFiles(state => state.map(file => {
        if (file.active) {
          return {
            ...file,
            status: 'saving',
          }
        }

        return file
      }))

      setTimeout(() => {
        setFiles(state => state.map(file => {
          if (file.active) {
            return {
              ...file,
              status: 'saved',
            }
          }

          return file
        }))
      }, 300)
    }, 300)

    return () => clearTimeout(fileStatusTimeout)
  }, [files])

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
