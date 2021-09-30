import styled, { css } from 'styled-components/macro'

export const Wrapper = styled.main`
  width: 100%;
  padding: 3rem;

  a {
    text-decoration: none;
    display: inline-block;
  }

  img {
    display: block;
    width: 100%;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
  }
`

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const Input = styled.input`
  padding: 0.4rem;
  border: 0;
  font-size: 1.6rem;

  &:focus {
    outline: none;
  }
`

export const Content = styled.div`
  display: flex;
  height: calc(100vh - 2.9rem - 6rem);
  overflow-y: scroll;
`

export const Textarea = styled.textarea`
  width: 50%;
  height: 100%;
  padding: 1.6rem;
  resize: none;
  border: 0;
  font-size: 1.6rem;
  font-family: "Inconsolata", "Courier New", Courier, monospace;

  &:focus {
    outline: none;
  }
`

export const Preview = styled.div`
  ${({ theme }) => css`
    position: relative;
    width: 50%;
    height: 100%;
    padding: 1.6rem;
    font-size: 1.6rem;
    word-break: break-word;

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: -2rem;
      width: 0.2rem;
      height: 98%;
      background: ${theme.colors.gray};
    }
  `}
`
