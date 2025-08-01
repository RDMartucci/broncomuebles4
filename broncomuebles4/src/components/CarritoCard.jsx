import { Card, Row, Col, Button } from "react-bootstrap";

export default function CarritoCard({ producto, funcionDisparadora }) {
    function borrarDelCarrito() {
        funcionDisparadora(producto.id);
    }

    return (
        <Card className="mb-3">
        <Card.Body>
            <Row className="align-items-center">
            <Col md={3}>
                <Card.Img
                variant="top"
                src={producto.imagen}
                style={{ maxHeight: "100px", objectFit: "cover", width: "100%" }}
                />
            </Col>
            <Col md={2}>
                <Card.Title>{producto.name}</Card.Title>
                <Card.Text className="text-muted">{producto.description}</Card.Text>
            </Col>
            <Col md={1}>
                <Card.Text>Cant: {producto.cantidad}</Card.Text>
            </Col>
            <Col md={2}>
                <Card.Text>Precio: {producto.price} $</Card.Text>
            </Col>
            <Col md={2}>
                <Card.Text>Subtotal: {producto.cantidad * producto.price} $</Card.Text>
            </Col>
            <Col md={2}>
                <Button variant="danger" onClick={borrarDelCarrito}>
                X
                </Button>
            </Col>
            </Row>
        </Card.Body>
        </Card>
    );
}