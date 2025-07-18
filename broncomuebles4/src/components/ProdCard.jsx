
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "../styles/Productos.css"

export default function ProdCard({ producto }) {
  console.log(producto)

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={producto.imagen}
        style={{ maxHeight: "200px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title>{producto.name}</Card.Title>
        <Link to={"/productos/" + producto.id} className="mt-auto">
          <Button variant="primary">Ver detalles del producto</Button>
        </Link>
      </Card.Body>
    </Card>



  )
}
