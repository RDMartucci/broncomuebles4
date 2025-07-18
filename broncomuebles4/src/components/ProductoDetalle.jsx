import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Mensaje } from "../assets/SweetAlert";
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useProductosContext } from "../contexts/ProductosContext";
import { Button, Spinner, Container, Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet";
import "../styles/ProductoDetalle.css";

export default function ProductoDetalle() {
  const navegar = useNavigate();
  const { admin } = useAuthContext();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const { productoEncontrado, obtenerProducto, eliminarProducto } = useProductosContext();
  const { id } = useParams();

  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerProducto(id)
      .then(() => setCargando(false))
      .catch((error) => {
        if (error === "Producto no encontrado") {
          setError("Producto no encontrado");
        } else {
          setError("Hubo un error al obtener el producto.");
        }
        setCargando(false);
      });
  }, [id]);

  function funcionCarrito() {
    if (cantidad < 1) return;
    agregarAlCarrito({ ...productoEncontrado, cantidad });
    Mensaje("Producto Agregado", "El producto fue agregado al carrito con éxito", "success", "Cerrar");
  }

  function dispararEliminar() {
    eliminarProducto(id)
      .then(() => navegar("/productos"))
      .catch((error) =>
        Mensaje("Hubo un problema al eliminar el producto", error, "error", "Cerrar")
      );
  }

  function sumarContador() {
    setCantidad(cantidad + 1);
  }

  function restarContador() {
    if (cantidad > 1) setCantidad(cantidad - 1);
  }

  if (cargando) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '50vh' }}>
        <Spinner animation="border" variant="primary" role="status" />
        <p className="mensaje-de-carga mt-3">Cargando productos...</p>
      </div>
    );
  }

  if (error) return <p className="mensaje-de-carga mt-3">{error}</p>;
  if (!productoEncontrado) return null;

  return (
    <Container className="py-5">
      <Helmet>
        <title>Detalle/BroncoMuebles</title>
        <meta name="description" content="Explora nuestra variedad de productos." />
      </Helmet>

      <h2 className="text-center mb-4">Detalles del producto</h2>

      <Row xs={1} md={2} className="g-4 align-items-center">
        <Col>
          <img
            src={productoEncontrado.imagen}
            alt={productoEncontrado.name}
            className="img-fluid rounded shadow-sm"
          />
        </Col>

        <Col>
          <div className="detalle-info">
            <h3 className="mb-3">{productoEncontrado.name}</h3>
            <p>{productoEncontrado.description}</p>
            <p className="fw-bold fs-5">{productoEncontrado.price} $</p>

            <div className="d-flex align-items-center gap-3 my-3">
              <Button variant="outline-secondary" onClick={restarContador}>-</Button>
              <span className="fs-5">{cantidad}</span>
              <Button variant="outline-secondary" onClick={sumarContador}>+</Button>
            </div>

            <div className="d-flex flex-wrap gap-2 mt-3">
              {admin ? (
                <>
                  <Link to={`/admin/editarProducto/${id}`}>
                    <Button variant="warning">Editar Producto</Button>
                  </Link>
                  <Button variant="danger" onClick={dispararEliminar}>
                    Eliminar Producto
                  </Button>
                </>
              ) : (
                <Button onClick={funcionCarrito}>Agregar al carrito</Button>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

