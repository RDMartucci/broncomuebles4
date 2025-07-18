import { Helmet } from "react-helmet"
import Carrusel2 from "../components/Carrusel2"
import CarruselAside from "../components/CarruselAside"
import Footer from "../components/Footer"
import Hero from "../components/Hero"

export default function Home() {

    return (
        <div>
            <Helmet>
                <title>Inicio/BroncoMuebles</title>
                <meta name="description" content="Explora nuestra variedad de productos." />
            </Helmet>
            <Carrusel2 />
            <Hero />
        </div>
    )
};