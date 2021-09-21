import { ReactComponent as Logo } from '../../assets/logo.svg'
import { ReactComponent as PlusIcon } from '../../assets/plus.svg'
import { ReactComponent as FileIcon } from '../../assets/file.svg'
import { ReactComponent as FileActiveIcon } from '../../assets/file-active.svg'
import { ReactComponent as EditingIcon } from '../../assets/ellipse.svg'
import { ReactComponent as SavingIcon } from '../../assets/loading.svg'
import { ReactComponent as SavedIcon } from '../../assets/check.svg'

import * as S from './styles'

type File = {
  id: string
  name: string
  content: string
  active: boolean
  status: 'editing' | 'saving' | 'saved'
}

const files: File[] = [
  {
    id: '1',
    name: 'README.md',
    content: 'Readme content',
    active: false,
    status: 'saved',
  },
  {
    id: '2',
    name: 'LICENSE.md',
    content: 'License content',
    active: false,
    status: 'saved',
  },
  {
    id: '3',
    name: 'links.md',
    content: 'Links content',
    active: false,
    status: 'saved',
  },
  {
    id: '4',
    name: 'CONTRIBUTING.md',
    content: 'Contributing content',
    active: false,
    status: 'saved',
  },
  {
    id: '5',
    name: 'roadmap.md',
    content: 'Roadmap content',
    active: true,
    status: 'editing',
  },
]

const statusIcon = {
  editing: <EditingIcon />,
  saving: <SavingIcon />,
  saved: <SavedIcon />,
}

function Sidebar () {
  return (
    <S.Wrapper>
      <header>
        <Logo />
      </header>

      <S.Title><span>Arquivos</span></S.Title>

      <S.AddFileButton><PlusIcon /> Adicionar arquivo</S.AddFileButton>

      <S.FileList>
        {files.map(file => {
          return (
            <S.FileItem key={file.id} active={file.active}>
              <S.FileLink href='#'>
                {file.active ? <FileActiveIcon /> : <FileIcon />}

                <span>{file.name}</span>
              </S.FileLink>

              {!file.active && <S.RemoveFileButton aria-label='Remove file'>x</S.RemoveFileButton>}

              {file.active && <S.FileStatus isSaving={file.status === 'saving'}>{statusIcon[file.status]}</S.FileStatus>}
            </S.FileItem>
          )
        })}
      </S.FileList>
    </S.Wrapper>
  )
}

export { Sidebar }
