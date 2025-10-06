import CarouselHome from '../../components/CarouselHome/CarouselHome';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faFaceSmile, faHeart } from '@fortawesome/free-regular-svg-icons';
import './Home.css';

export default function Home (){
    return(
        <>
            <div className="carousel-wrapper">
                <CarouselHome />
            </div>
            <Container>
                <section className='m-4'>
                    <div className="row text-center">
                        <div className="col-12 col-md-4 p-2 info-home my-2">
                            <div>
                                <FontAwesomeIcon icon={faTruck} size='3x' className='color-icon'/>
                            </div>
                            <div className='info-text'>
                                <p className="mb-2"> ENVIOS GRATIS EN COMPRAS SUPERIORES A $100.000 </p>
                            </div>

                        </div>
                        <div className="col-12 col-md-4 p-2 border-lr info-home">
                            <div>
                                <FontAwesomeIcon icon={faFaceSmile} size='3x' className='color-icon' />
                            </div>
                            <div className='info-text'>
                                <p className="mb-2"> 20% DE DESCUENTO EN TRANSFERENCIAS </p>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 p-2 info-home">
                            <div>
                                <FontAwesomeIcon icon={faHeart} size='3x' className='color-icon' />
                            </div>
                            <div className='info-text'>
                                <p className="mb-2">PRODUCTOS A PEDIDO Y ENCARGOS PERSONALIZADOS</p>
                            </div>
                        </div>
                    </div>
                </section>
            </Container>
        </>
    )
};