import { Content } from 'components/content'
import { Sidebar } from 'components/sidebar'
import { useFiles } from 'hooks/files'

import styled from 'styled-components/macro'

function App () {
  const { files, handleFileUpdate, handleAddFile, handleFileSelection, handleRemoveFile, inputRef } = useFiles()

  return (
    <Wrapper>
      <Sidebar
        files={files}
        handleAddFile={handleAddFile}
        handleFileSelection={handleFileSelection}
        handleRemoveFile={handleRemoveFile}
      />

      <Content inputRef={inputRef} files={files} handleFileUpdate={handleFileUpdate} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
`

export { App }
