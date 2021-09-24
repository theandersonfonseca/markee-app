import { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import localforage from 'localforage'

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

function useFiles () {
  const inputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<File[]>([initialFile])

  useEffect(() => {
    localforage.setItem('MARKEE_FILES', files)
  }, [files])

  useEffect(() => {
    async function getFiles () {
      const files = await localforage.getItem<File[]>('MARKEE_FILES')

      if (files) setFiles(files)
    }

    getFiles()
  }, [])

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

  const handleFileUpdate = (data: string, prop: 'name' | 'content') => {
    const activeFile = files.filter(file => file.active)[0]

    setFiles(state =>
      state.map(file => {
        if (file.id === activeFile.id) {
          return ({
            ...activeFile,
            status: 'editing',
            [prop]: data,
          })
        }

        return file
      }),
    )
  }

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

  const handleFileSelection = (fileId: string) => {
    inputRef.current?.focus()

    setFiles(state =>
      state.map(file => {
        if (file.id === fileId) {
          return ({
            ...file,
            active: true,
          })
        }

        return ({ ...file, active: false })
      }),
    )
  }

  const handleRemoveFile = (fileId: string) => {
    setFiles(state => state.filter(file => fileId !== file.id))
  }

  return {
    files,
    setFiles,
    handleFileUpdate,
    handleAddFile,
    handleFileSelection,
    handleRemoveFile,
    inputRef,
  }
}

export { useFiles }
