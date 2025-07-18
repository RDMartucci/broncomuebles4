import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Container, Button, Card, Navbar, Nav, Row, Col, ButtonGroup } from "react-bootstrap";

export default function DashboardAdmin() {
    const { user, admin } = useAuthContext();
    const navigate = useNavigate();
    
    const preAgregarProducto = () => {
        console.log('direccionando a agregar producto...:');
        navigate('/dashboardAdmin/agregarProductos');
    }

    return (
        <main>
        {admin && (
            <section className="sec-dashboard">
            <div className="d-flex justify-content-evenly w-100 align-items-center flex-wrap-nowrap">
                <h2 className='titulo titulo-pag'>Dashboard</h2>
                <h5 className='text-center'>Accedido como Administrador: <strong>{user}</strong>
                </h5>
            </div>
                <Container className="d-flex justify-content-center align-items-center">
                    <Card style={{ width: "100%" }}>
                        <Card.Body className="text-center">
                            <Card.Title className='titulo titulo-pag'>Panel de administración</Card.Title>
                            <Card.Text className="mb-4">Acá encontrarás las herramientas necesarias para tener el control de tus productos.</Card.Text>
                            <ButtonGroup aria-label="grupo acciones">
                                <Button variant="secondary" onClick={() => preAgregarProducto()} >Agregar producto</Button>
                            </ButtonGroup>
                        </Card.Body>
                    </Card>

                </Container>
            </section>)
        }
        </main>
    );
}
