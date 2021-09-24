import { useState, RefObject, useEffect } from 'react'
import marked from 'marked'
import 'highlight.js/styles/github.css'
import { ReactComponent as FileActiveIcon } from '../../assets/file-active.svg'

import * as S from './styles'

type FileStatus = 'editing' | 'saving' | 'saved'

export type File = {
  id: string
  name: string
  content: string
  active: boolean
  status: FileStatus
}

import('highlight.js').then(hljs => {
  const h = hljs.default

  marked.setOptions({
    highlight: (code, language) => {
      if (language && h.getLanguage(language)) {
        return h.highlight(code, { language }).value
      }

      return h.highlightAuto(code).value
    },
  })
})

type ContentProps = {
  inputRef: RefObject<HTMLInputElement>
  files: File[]
  handleFileUpdate: (data: string, prop: 'name' | 'content') => void
}

function Content ({ inputRef, files, handleFileUpdate }: ContentProps) {
  const [activeFile, setActiveFile] = useState<File>(() => files.filter(file => file.active)[0])

  useEffect(() => {
    setActiveFile(files.filter(file => file.active)[0])
  }, [files])

  return (
    <S.Wrapper>
      <S.InputWrapper>
        <FileActiveIcon />
        <S.Input type='text' value={activeFile.name} ref={inputRef} onChange={(e) => handleFileUpdate(e.target.value, 'name')} />
      </S.InputWrapper>

      <S.Content>
        <S.Textarea
          placeholder='Digite aqui seu markdown'
          value={activeFile.content}
          onChange={(e) => handleFileUpdate(e.target.value, 'content')}
        />

        <S.Preview dangerouslySetInnerHTML={{ __html: marked(activeFile.content) }} />
      </S.Content>
    </S.Wrapper>
  )
}

export { Content }
