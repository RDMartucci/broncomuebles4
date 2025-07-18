import { Container, Row, Col, Image } from "react-bootstrap";
import CarruselAside from "./CarruselAside";

function Hero() {
  return (
    <main>
      <section className="hero">
        <Container className="my-4">
          <Row className="">
            <Col xs={12} md={4} lg={4}>
              {/* <Image
                src="https://www.uship.com/learn/ca/wp-content/uploads/sites/3/thumbnail-placeholder-300x200-300x200.png"
                alt="Imagen ilustrativa"
                fluid
                rounded
              /> */}
              <CarruselAside/>
            </Col>
            <Col xs={12} md={8} lg={8}>

              <h2 className='titulo titulo-pag'>características y beneficios</h2>
              <ul className='texto-principal'>
                <li><span className='texto-color-sombra'>Diseños exclusivos:</span> <p className='leyenda'>Piezas únicas que se adaptan a diferentes estilos de decoración.</p></li>
                <li><span className='texto-color-sombra'>Materiales de alta calidad:</span> <p className='leyenda'>Utilizamos maderas nobles y materiales sostenibles que aseguran la resistencia y belleza de cada producto.</p></li>
                <li><span className='texto-color-sombra'>Hecho a mano:</span> <p className='leyenda'>Cada mueble es elaborado de manera artesanal, con atención al detalle y la tradición.</p></li>
                <li><span className='texto-color-sombra'>Personalización:</span> <p className='leyenda'>Adaptamos nuestros diseños a las necesidades y gustos de nuestros clientes, para que cada mueble sea un reflejo de su personalidad.</p></li>
              </ul>

            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
}

export default Hero;
