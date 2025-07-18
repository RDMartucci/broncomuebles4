import { useContext } from "react";
import { CarritoContext } from "../contexts/CarritoContext.jsx";
import { AuthContext, useAuthContext } from "../contexts/AuthContext.jsx";
import { Link, Navigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { Mensaje } from '../assets/SweetAlert.js';
import CarritoCard from "./CarritoCard.jsx";
import Row from 'react-bootstrap/Row';
import '../styles/carrito.css';

export default function Carrito() {
    const { user } = useContext(AuthContext);
    const { productosCarrito, vaciarCarrito, borrarProductoCarrito } = useContext(CarritoContext);

    const total = productosCarrito.reduce(
        (subTotal, producto) => subTotal + producto.price * producto.cantidad,
        0
    );

    function funcionDisparadora(id) {
        borrarProductoCarrito(id);
    }

    function funcionDisparadora2() {
        vaciarCarrito();
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    function preHacerPedido() {
        console.log('Se realizo el pedido!');
        Mensaje('Pedido completado!', 'Tu compra se mandó con exito!', 'success', 'cerrar');
        vaciarCarrito();
        Navigate('/');
    }
    return (
        <Container className="my-4">
            <h2 className="titulo mb-3">Carrito de compras</h2>
            <Row xs={1} md={1} lg={1} >
                {productosCarrito.length > 0 ? (
                    productosCarrito.map((producto) => (
                        <CarritoCard
                            key={producto.id}
                            producto={producto}
                            funcionDisparadora={funcionDisparadora}
                        />
                    ))
                ) : (
                    <div className="alert alert-warning text-center mt-4 fs-5">
                        Tu carrito está vacío
                    </div>
                )}
            </Row>
            {total > 0 && (
                <div className="alert alert-info mt-4 text-center fs-5">
                    Total a pagar: <span className="fw-bold text-success">$ {total.toFixed(2)}</span>
                </div>
            )}
            {productosCarrito.length > 0 &&
            <div className=" d-flex flex-column flex-md-row justify-content-center gap-2 mt-3">
                <button className="btn-comprar btn  rounded-pill w-100" onClick={preHacerPedido}>
                    Hacer pedido!
                </button>

                <Link to="/productos" className="btn-continuar btn rounded-pill w-100">
                    <i className="bi bi-arrow-left me-2"></i>
                    Continuar comprando
                </Link>

                {/* <button className="btn btn-outline-danger rounded-pill" onClick={funcionDisparadora2}>
                    Vaciar carrito
                </button> */}
                <Button variant="" className="btn-vaciar-carrito btn  rounded-pill w-100" onClick={funcionDisparadora2}>
                    Vaciar carrito
                </Button>
            </div>}
        </Container>
    );
}

