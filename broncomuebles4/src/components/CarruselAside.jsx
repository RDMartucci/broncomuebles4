import { useProductosContext } from "../contexts/ProductosContext";
import { useEffect, useState } from "react";
import { Carousel, Container, Spinner } from "react-bootstrap";

export default function CarruselAside() {
    const { productos, obtenerProductos } = useProductosContext();
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        if (productos.length === 0) {
            obtenerProductos().then(() => setCargando(false));
        } else {
            setCargando(false);
        }
    }, []);

    const prodCarrusel = productos.slice(3, 6); //tomas de la pos.3, 3 posiciones.

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
        <Container className="my-4 w-100">
            <Carousel controls={false} indicators={false}>
                {prodCarrusel.map((producto) => (

                    <Carousel.Item key={producto.id}>
                        <img
                            className="d-block w-100"
                            src={producto.imagen} // Cambia esto por la ruta de tu imagen
                            alt={producto.name}
                            style={{ height: "300px", objectFit: "cover" }}
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
