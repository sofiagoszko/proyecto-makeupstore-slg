import CarouselHome from '../../components/CarouselHome/CarouselHome';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faFaceSmile, faHeart } from '@fortawesome/free-regular-svg-icons';
import InfoCard from '../../components/InfoCard/InfoCard';
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
                        <InfoCard icon={faTruck} text='ENVIOS GRATIS EN COMPRAS SUPERIORES A $100.000' />
                        <InfoCard icon={faFaceSmile} text='20% DE DESCUENTO EN TRANSFERENCIAS' border />
                        <InfoCard icon={faHeart} text='PRODUCTOS A PEDIDO Y ENCARGOS PERSONALIZADOS' />    
                    </div>
                </section>
            </Container>
        </>
    )
};