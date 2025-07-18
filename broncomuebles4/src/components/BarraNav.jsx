import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Badge, Image } from "react-bootstrap";
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import { FaShoppingCart } from "react-icons/fa";
import logo from '../assets/broncomuebles-logo-chico01.png';

export default function BarraNav() {
  const { productosCarrito } = useContext(CarritoContext);
  const { admin } = useAuthContext();
  const [expanded, setExpanded] = useState(false);

  return (

    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" expanded={expanded} onToggle={setExpanded}>
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={() => setExpanded(false)}>
          <img style={{ height: '40px' }} src={logo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="nav-principal" />
        <Navbar.Collapse id="nav-principal">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>Inicio</Nav.Link>
            <Nav.Link as={Link} to="/productos" onClick={() => setExpanded(false)}>Productos</Nav.Link>
            <Nav.Link as={Link} to="/nosotros" onClick={() => setExpanded(false)}>Nosotros</Nav.Link>
            <Nav.Link as={Link} to="/contacto" onClick={() => setExpanded(false)}>Contacto</Nav.Link>
            {admin && <Nav.Link as={Link} to="/admin" onClick={() => setExpanded(false)}>Admin</Nav.Link>}
            {admin && <Nav.Link as={Link} to="/admin/agregarProductos" onClick={() => setExpanded(false)}>Agregar productos</Nav.Link>}
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/carrito" onClick={() => setExpanded(false)}>
              <FaShoppingCart style={{ marginRight: "5px" }} />
              {productosCarrito.length > 0 && (
                <Badge bg="light" text="dark">{productosCarrito.length}</Badge>
              )}
            </Nav.Link>
            <Nav.Link as={Link} to="/login" onClick={() => setExpanded(false)}>Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
