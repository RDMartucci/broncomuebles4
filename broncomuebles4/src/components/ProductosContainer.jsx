import { useEffect, useState } from "react"
import { useProductosContext } from "../contexts/ProductosContext"
import { Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { FaSearch } from "react-icons/fa";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ProdCard from "./ProdCard"
import "../styles/Productos.css"


function ProductosContainer({ }) {
    const { productos, obtenerProductos, filtrarProductos } = useProductosContext();
    const [paginaActual, setPaginaActual] = useState(1);
    //Para la paginación.
    const prodXPag = 10; //Cantidad de productos mostrados por vista.
    // Calcular el índice de los productos a mostrar en la página actual
    const indiceUltimoProd = paginaActual * prodXPag;
    const indicePrimerProd = indiceUltimoProd - prodXPag;
    const productosActuales = productos.slice(indicePrimerProd, indiceUltimoProd);

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [filtro, setFiltro] = useState("")

    {
        useEffect(() => {
            obtenerProductos().then((productos) => {
                setCargando(false);
            }).catch((error) => {
                setError('Hubo un problema al cargar los productos.');
                setCargando(false);
            })
        }, []);
    }

    useEffect(() => {
        filtrarProductos(filtro)
    }, [filtro])

    /**** Paginado ************************************************************/
    const totalPaginas = Math.ceil(productos.length / prodXPag);
    const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);
    /*********************************************************************** */

    if (cargando) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '50vh' }}>
                <Spinner animation="border" variant="primary" role="status" />
                <p className="mensaje-de-carga mt-3">Cargando productos...</p>
            </div>
        );
    } else if (error) {
        return <p className="mensaje-de-carga mt-3">{error}</p>;
    } else {
        return (
            <div className="p-3">
                <h2 className="titulo">Nuestros productos</h2>
                <Helmet>
                    <title>Productos/BroncoMuebles</title>
                    <meta name="description" content="Explora nuestra variedad de productos." />
                </Helmet>
                <div className="input-group mb-3 mt-3">
                    <span className="input-group-text">
                        <FaSearch />
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar productos..."
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />
                </div>
                <Row xs={2} md={3} lg={4} xl={5} className='g-4 row-card'>
                    {productosActuales.length > 0 ? productosActuales.map((producto) => (
                        <Col>
                            <ProdCard
                                producto={producto} />
                        </Col>
                    )) : <p className="mensaje-de-carga mt-3">sin productos para mostrar</p>}
                </Row>
                {/*Componente de paginacion*/}
                <div className="pagination-container my-4">
                    <div className="pagination-scroll">
                        {Array.from({ length: totalPaginas }, (_, index) => (
                            <button
                                key={index + 1}
                                className={`btn mx-1 ${paginaActual === index + 1 ? "btn-primary" : "btn-outline-primary"}`}
                                onClick={() => cambiarPagina(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        )
    }


}

export default ProductosContainer

