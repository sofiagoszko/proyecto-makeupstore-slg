import { Button } from "react-bootstrap";

export default function ButtonForm({ buttonText }){
    return(
        <div className='mb-4 text-start text-md-end'>
            <Button className='btn-card'>{buttonText}</Button>
        </div>
    );
};