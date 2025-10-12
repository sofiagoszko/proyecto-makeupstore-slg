import CarouselHome from '../../components/CarouselHome/CarouselHome';
import { Container } from 'react-bootstrap';
import { faTruck, faFaceSmile, faHeart } from '@fortawesome/free-regular-svg-icons';
import CardInfoHome from '../../components/CardInfoHome/CardInfoHome';
import CardCategoriaHome from '../../components/CardCategoriaHome/CardCategoriaHome';
import './Home.css';
import labiosImg from '../../assets/labios.png';
import rostroImg from '../../assets/rostro.png';
import ojosImg from '../../assets/ojos.jpg';

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
                <section className='m-4'>
                    <div className='row text-center g-4'> 
                        <CardCategoriaHome imagen={rostroImg} text='Rostro' ruta='/productos/rostro'/>
                        <CardCategoriaHome imagen ={ojosImg} text='Ojos' ruta='/productos/ojos'/>
                        <CardCategoriaHome imagen= {labiosImg} text='Labios' ruta='/productos/labios'/>   
                    </div>
                </section>
            </Container>
        </>
    )
};