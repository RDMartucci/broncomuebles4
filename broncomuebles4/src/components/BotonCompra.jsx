import styled from "styled-components";

const BotonCompra = styled.button`
  background-color: var(--green);
  color: var(--blanco);
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: var(--orange);
  }
`;

function Producto({text}) {
  return <BotonCompra>{text}</BotonCompra>;
}

export default Producto