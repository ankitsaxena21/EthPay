import styled from 'styled-components';

export const ButtonContainer = styled.button`
text-transform:capitalize;
font-size: 1.4rem;
background: transparent;
border: 0.5rem solid var(--lightBlue);
border-color: ${props => (props.cart ? "var(--mainYellow)" : "var(--lightBlue)")};
color:${props => (props.cart ? "var(--mainYellow)" : "var(--lightBlue)")};
border-radius: 0.5rem;
padding: 0.2rem 0.5rem;
cursor:pointer;
margin:0.2rem 0.5rem 0.2rem 0;
transition: a;; 0.5rem ease-in-out;
&:hover{
  background:${props => (props.cart ? "var(--mainYellow)" : "var(--lightBlue)")};
  color:var(--mainBlue);
}
&focus{
  outline: none;
}
`