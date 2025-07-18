// src/components/FormularioContacto.jsx
import { useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";

export default function FormularioContacto() {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        mensaje: "",
    });

    const [enviado, setEnviado] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Mensaje enviado:", formData);

        setEnviado(true);
        setFormData({ nombre: "", email: "", mensaje: "" });

        setTimeout(() => setEnviado(false), 4000);
    };

    return (
        <Container className="mt-3 min-vh-100" style={{ maxWidth: '600px' }}>
            {enviado && <Alert variant="success">Gracias por tu mensaje. Te responderemos pronto.</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        name="nombre"
                        placeholder="Tu nombre completo"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="tuemail@ejemplo.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMensaje">
                    <Form.Label>Mensaje</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="mensaje"
                        rows={4}
                        placeholder="Escribí tu mensaje..."
                        value={formData.mensaje}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Enviar
                </Button>
            </Form>
        </Container>
    );
}
