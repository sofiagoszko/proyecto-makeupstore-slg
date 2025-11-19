import { Navigate } from 'react-router-dom';

export default function Admin(){
    const admin = localStorage.getItem('admin') === 'true';

    if(!admin){
        return <Navigate to={'/'}/>
    }

    return(
        <div>
            <h1>Portal administador</h1>
        </div>
    )
};
