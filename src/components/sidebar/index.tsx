import { ReactComponent as Logo } from '../../assets/logo.svg'
import { ReactComponent as PlusIcon } from '../../assets/plus.svg'
import { ReactComponent as FileIcon } from '../../assets/file.svg'
import { ReactComponent as FileActiveIcon } from '../../assets/file-active.svg'
import { ReactComponent as EditingIcon } from '../../assets/ellipse.svg'
import { ReactComponent as SavingIcon } from '../../assets/loading.svg'
import { ReactComponent as SavedIcon } from '../../assets/check.svg'

import * as S from './styles'

type FileStatus = 'editing' | 'saving' | 'saved'

export type File = {
  id: string
  name: string
  content: string
  active: boolean
  status: FileStatus
}

type SidebarProps = {
  files: File[]
  handleAddFile: () => void
  handleFileSelection: (fileId: string) => void
  handleRemoveFile: (fileId: string) => void
}

const statusIcon = {
  editing: <EditingIcon />,
  saving: <SavingIcon />,
  saved: <SavedIcon />,
}

function Sidebar ({ files, handleAddFile, handleFileSelection, handleRemoveFile }: SidebarProps) {
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
              <S.FileLink href='#' onClick={() => handleFileSelection(file.id)}>
                {file.active ? <FileActiveIcon /> : <FileIcon />}

                <span>{file.name}</span>
              </S.FileLink>

              {!file.active && <S.RemoveFileButton aria-label='Remove file' onClick={() => handleRemoveFile(file.id)}>x</S.RemoveFileButton>}

              {file.active && <S.FileStatus isSaving={file.status === 'saving'}>{statusIcon[file.status]}</S.FileStatus>}
            </S.FileItem>
          )
        })}
      </S.FileList>
    </S.Wrapper>
  )
}

export { Sidebar }
