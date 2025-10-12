import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CardInfoHome.css';

export default function InfoCard ({icon, text, border}){
    return (
        <div className={`col-12 col-md-4 p-2 ${border ? 'border-lr' : ''}`}>
            <div>
                <FontAwesomeIcon icon={icon} size='3x' className='color-icon m-2'/>
            </div>
            <div className='info-text'>
                <p className='text-center'> {text} </p>
            </div>
        </div>
    );
}