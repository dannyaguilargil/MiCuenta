import { FourSquare } from "react-loading-indicators";

function CargaPagina() {

    return (
       <div className="app">
            <div style={{ height: "100vh", width: "100vw" }} className="d-flex justify-content-center align-items-center">
                <div className="carga-pagina w-100 h-100 d-flex justify-content-center align-items-center">
                    
                    <FourSquare color={["#0E9754", "#0E9754", "#0E9754", "#0E9754"]} />
                    <p>Cargando...</p>
                </div>
            </div>
        </div>
    );
}
export default CargaPagina;
