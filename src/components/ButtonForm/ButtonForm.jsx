import { Button } from "react-bootstrap";

export default function ButtonForm({ buttonText, onClick, type = 'submit' }){
    return(
        <div className='mb-4 text-start text-md-end'>
            <Button className='btn-card' onClick={onClick} type={type}>{buttonText}</Button>
        </div>
    );
};