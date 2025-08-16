import Button from 'react-bootstrap/Button';
import { IoDocumentTextOutline } from "react-icons/io5";
import TablaRadicados from './tablaRadicados';

const Radicados = () => {

    

  return (
    <div className='container'>
        <section className='d-flex gap-2 mb-3 mt-5'>   
            <Button variant="dark"><div className='d-flex gap-3'><span>+</span>Nuevo Radicado</div> </Button>
            <Button variant="primary"><div className='d-flex gap-3'><span><IoDocumentTextOutline /></span>Contratos / Cuentas de Cobro</div> </Button>
        </section>
       
        <section className='mb-5' style={{padding:"30px",boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"}}>
            <TablaRadicados/>
        </section>
    </div>
  );
};

export default Radicados;
