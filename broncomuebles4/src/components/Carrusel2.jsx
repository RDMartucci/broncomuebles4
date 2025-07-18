import { useProductosContext } from "../contexts/ProductosContext";
import { useEffect, useState } from "react";
import { Carousel, Container, Spinner } from "react-bootstrap";

function Carrusel2() {
    const { productos, obtenerProductos } = useProductosContext();
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        if (productos.length === 0) {
            obtenerProductos().then(() => setCargando(false));
        } else {
            setCargando(false);
        }
    }, []);

    const prodCarrusel = productos.slice(0, 3);

    // if (cargando) return <p>Cargando carrusel...</p>;
        if (cargando) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '50vh' }}>
                <Spinner animation="border" variant="primary" role="status" />
                <p className="mensaje-de-carga mt-3">Cargando productos...</p>
            </div>
        );
    }
    if (prodCarrusel.length === 0) return <p className="mensaje-de-carga mt-3">No hay productos para mostrar.</p>;

    return (
        <Container className="my-4">
        <h2 className="titulo hero">nuestras ofertas</h2>
            <Carousel className="carrusel">
                {prodCarrusel.map((producto) => (
                <Carousel.Item key={producto.id}>
                    <img
                    className="d-block w-100"
                    src={producto.imagen}
                    alt={producto.name}
                    style={{ height: "400px", objectFit: "cover" }}
                    />
                    <Carousel.Caption>
                    <h3>{producto.name}</h3>
                    <p>{producto.description}</p>
                    </Carousel.Caption>
                </Carousel.Item>
                ))}
            </Carousel>
        </Container>
    );
}

export default Carrusel2;
