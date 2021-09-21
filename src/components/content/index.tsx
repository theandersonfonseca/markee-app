import { ReactComponent as FileActiveIcon } from '../../assets/file-active.svg'

import * as S from './styles'

function Content () {
  return (
    <S.Wrapper>
      <S.InputWrapper>
        <FileActiveIcon />
        <S.Input type='text' />
      </S.InputWrapper>

      <S.Content>
        <S.Textarea>textarea</S.Textarea>
        <S.Preview>preview</S.Preview>
      </S.Content>
    </S.Wrapper>
  )
}

export { Content }
