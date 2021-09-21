import styled, { css } from 'styled-components/macro'

export const Wrapper = styled.aside`
  ${({ theme }) => css`
    width: 32rem;
    padding: 3rem;
    background: ${theme.colors.black};

    & header {
      display: flex;
      justify-content: center;
    }
  `}
`

export const Title = styled.h2`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    margin-top: 5rem;
    color: ${theme.colors.white};

    &:before,
    &:after {
      content: '';
      height: 0.2rem;
      background: ${theme.colors.primary};
      border-radius: 10rem
    }

    &:before {
      width: 3rem;
    }

    &:after {
      width: 100%;
    }

    & span {
      margin: 0 1rem;
    }
  `}
`

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  cursor: pointer;
  border-radius: 0.4rem;
  transition: 0.3s;
`

export const AddFileButton = styled(Button)`
  ${({ theme }) => css`
    width: 100%;
    margin-top: 3rem;
    padding: 0.8rem;
    font-size: 1.4rem;
    color: ${theme.colors.lightBlack};
    background: ${theme.colors.primary};

    &:hover {
      background: ${theme.colors.primaryDark};
    }

    svg {
      margin-right: 0.8rem;
    }
  `}
`

export const RemoveFileButton = styled(Button)`
  ${({ theme }) => css`
    display: none;
    margin-left: auto;
    font-size: 1.6rem;
    color: ${theme.colors.gray};
    background: transparent;
  `}
`

export const FileList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  margin-top: 3rem;
`

type FileItemProps = {
  active: boolean
}

export const FileItem = styled.li<FileItemProps>`
  ${({ theme, active }) => css`
    display: flex;
    align-items: center;
    padding: 0.8rem;
    color: ${theme.colors.gray};
    border-radius: 0.4rem;
    transition: 0.3s;
    background: ${active && theme.colors.lightBlack};

    &:not(:first-child) {
      margin-top: 0.6rem;
    }

    &:hover {
      background: ${theme.colors.lightBlack};

      ${RemoveFileButton} {
        display: block;
      }
    }

    & span {
      margin-left: 0.8rem;
      font-size: 1.4rem;
    }
  `}
`

export const FileLink = styled.a`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    text-decoration: none;
    color: ${theme.colors.gray};
  `}
`

type FileStatusProps = {
  isSaving: boolean
}

const fileStatusModifiers = {
  saving: () => css`
    animation: rotate 1s linear infinite;

    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `,
}

export const FileStatus = styled.div<FileStatusProps>`
  ${({ isSaving }) => css`
    display: flex;
    align-items: center;
    margin-left: auto;

    ${isSaving && fileStatusModifiers.saving()}
  `}
`
