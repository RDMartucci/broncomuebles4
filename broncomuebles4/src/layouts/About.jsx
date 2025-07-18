import { Helmet } from 'react-helmet';
import '../styles/about.css';

export default function About() {
    return (
        <>
            <Helmet>
                <title>About/BroncoMuebles</title>
                <meta name="description" content="Explora nuestra variedad de productos." />
            </Helmet>
            <main className='min-vh-100'>
                <section className='about'>
                    <h2 className="titulo titulo-pag">acerca de BroncoMuebles shopping</h2>
                    <p className="texto-principal leyenda texto-espaciado">En<span className='texto-color-sombra'> BroncoMuebles</span>, valoramos el arte de la carpintería y la fabricación artesanal. Nuestro objetivo es proporcionar muebles de alta calidad que se integren perfectamente en cualquier hogar, sin perder la esencia de lo hecho a mano.
                        Cada uno de nuestros productos es elaborado por artesanos locales, quienes ponen dedicación en cada detalle para garantizar la durabilidad y el diseño único de nuestros muebles.</p>
                </section>
            </main>
        </>
    )
}
