import { useState, ChangeEvent } from 'react'
import { ReactComponent as FileActiveIcon } from '../../assets/file-active.svg'

import marked from 'marked'
import 'highlight.js/styles/github.css'

import * as S from './styles'

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

function Content () {
  const [content, setContent] = useState('')

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  return (
    <S.Wrapper>
      <S.InputWrapper>
        <FileActiveIcon />
        <S.Input type='text' defaultValue='Sem título' />
      </S.InputWrapper>

      <S.Content>
        <S.Textarea
          placeholder='Digite aqui seu markdown'
          value={content}
          onChange={handleChange}
        />

        <S.Preview dangerouslySetInnerHTML={{ __html: marked(content) }} />
      </S.Content>
    </S.Wrapper>
  )
}

export { Content }
