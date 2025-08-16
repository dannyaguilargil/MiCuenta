import { Bounce } from 'react-toastify';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const useToast= (mensaje)=>{
    
    const notify = (mensaje) => toast(mensaje, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
    });

    return {
        notify
    }

}

export default useToast;