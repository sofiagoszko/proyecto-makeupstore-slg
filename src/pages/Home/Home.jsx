import CarouselHome from '../../components/CarouselHome/CarouselHome';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faFaceSmile, faHeart } from '@fortawesome/free-regular-svg-icons';
import CardInfoHome from '../../components/CardInfoHome/CardInfoHome';
import './Home.css';

export default function Home (){
    return(
        <>
            <div className='carousel-wrapper'>
                <CarouselHome />
            </div>
            <Container>
                <section className='m-4'>
                    <div className='row text-center'>
                        <CardInfoHome icon={faTruck} text='ENVIOS GRATIS EN COMPRAS SUPERIORES A $100.000' />
                        <CardInfoHome icon={faFaceSmile} text='20% DE DESCUENTO EN TRANSFERENCIAS' border />
                        <CardInfoHome icon={faHeart} text='PRODUCTOS A PEDIDO Y ENCARGOS PERSONALIZADOS' />    
                    </div>
                </section>
            </Container>
        </>
    )
};