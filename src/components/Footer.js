import React from 'react'
import styled from 'styled-components'
const Footer = () => {
  return (
    <Wrapper>
      <h5>
        &copy; {new Date().getFullYear()}
        <span> ElPawl.com</span>
      </h5>
      <h5> Crypto E-Commerce </h5>
    </Wrapper>
  )
}

const Wrapper = styled.footer`
  min-height: 10vh;

  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--clr-grey-1);
  text-align: center;
  span {
    color: var(--clr-grey-9);
  }
  h5 {
    color: var(--clr-white);
    margin: 0.1rem;

    font-weight: 400;
    text-transform: none;
    line-height: 1.25;
  }
  @media (min-width: 776px) {
    flex-direction: row;
  }
`

export default Footer
