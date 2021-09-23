import { Dispatch, RefObject, SetStateAction } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { ReactComponent as Logo } from '../../assets/logo.svg'
import { ReactComponent as PlusIcon } from '../../assets/plus.svg'
import { ReactComponent as FileIcon } from '../../assets/file.svg'
import { ReactComponent as FileActiveIcon } from '../../assets/file-active.svg'
import { ReactComponent as EditingIcon } from '../../assets/ellipse.svg'
import { ReactComponent as SavingIcon } from '../../assets/loading.svg'
import { ReactComponent as SavedIcon } from '../../assets/check.svg'

import * as S from './styles'

import { File as FileType } from '../../app'

type SidebarProps = {
  inputRef: RefObject<HTMLInputElement>
  files: FileType[]
  setFiles: Dispatch<SetStateAction<FileType[]>>
}

const statusIcon = {
  editing: <EditingIcon />,
  saving: <SavingIcon />,
  saved: <SavedIcon />,
}

function Sidebar ({ inputRef, files, setFiles }: SidebarProps) {
  const handleAddFile = () => {
    inputRef.current?.focus()

    setFiles(state => [
      ...state.map(file => ({ ...file, active: false })),
      {
        id: uuidv4(),
        name: 'Sem título',
        content: '',
        active: true,
        status: 'saved',
      },
    ])
  }

  return (
    <S.Wrapper>
      <header>
        <Logo />
      </header>

      <S.Title><span>Arquivos</span></S.Title>

      <S.AddFileButton onClick={handleAddFile}><PlusIcon /> Adicionar arquivo</S.AddFileButton>

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
