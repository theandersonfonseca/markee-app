import { useState, RefObject, Dispatch, SetStateAction, useEffect } from 'react'
import { ReactComponent as FileActiveIcon } from '../../assets/file-active.svg'

import marked from 'marked'
import 'highlight.js/styles/github.css'

import * as S from './styles'

import { File as FileType } from '../../app'

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
  files: FileType[]
  setFiles: Dispatch<SetStateAction<FileType[]>>
}

function Content ({ inputRef, files, setFiles }: ContentProps) {
  const [activeFile, setActiveFile] = useState<FileType>(() => files.filter(file => file.active)[0])

  useEffect(() => {
    setActiveFile(files.filter(file => file.active)[0])
  }, [files])

  const handleChange = (data: string, prop: 'name' | 'content') => {
    setFiles(state =>
      state.map(file => {
        if (file.id === activeFile.id) {
          return ({
            ...activeFile,
            [prop]: data,
          })
        }

        return file
      }),
    )
  }

  return (
    <S.Wrapper>
      <S.InputWrapper>
        <FileActiveIcon />
        <S.Input type='text' value={activeFile.name} ref={inputRef} onChange={(e) => handleChange(e.target.value, 'name')} />
      </S.InputWrapper>

      <S.Content>
        <S.Textarea
          placeholder='Digite aqui seu markdown'
          value={activeFile.content}
          onChange={(e) => handleChange(e.target.value, 'content')}
        />

        <S.Preview dangerouslySetInnerHTML={{ __html: marked(activeFile.content) }} />
      </S.Content>
    </S.Wrapper>
  )
}

export { Content }
