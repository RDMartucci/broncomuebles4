import '../styles/footer.css';

export default function Footer() { 
    return ( 
    <>
    <footer className='footer-footer'>
        <div className='newsletter-contenedor'>
            <span className='newsletter-titulo'>Newsletter</span>
            <span className='newsletter-texto'>Registrate y recibí nuestras ofertas.</span>
            <span className='input-correo'>Ingresa tu email...</span>
        </div>
        <div className='copyright-contenedor'>
            <span className='texto-copyright'>&copy; 2025 - Bronco Shopping</span>
        </div> 
    </footer> 
    </>
    ); 
}