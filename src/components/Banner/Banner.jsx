import './Banner.css';

export default function Banner ({imagen, titulo}){
    return (
        <div className='banner'>
            <img src={imagen} alt={titulo} className='banner-img'/>
            <div className="banner-overlay">
                <h1 className="banner-text">{titulo}</h1>
            </div>
        </div>
    )
}