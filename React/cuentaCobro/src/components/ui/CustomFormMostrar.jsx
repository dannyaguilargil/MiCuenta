import CampoForm from "../common/InputModal" 
import CabezeraModal from "../layout/Modal/CabezeraModal";
import transformarLogData from "../../features/logSolicitud/transformacionLogForm"
const CustomFormMostrar =(props)=>{
    
    return (
        <>
        <form action="" className="container">
            <div className="card mb-4">
                <div className="card-body">
                        <CabezeraModal
                        background="#FFFFCC"
                        title={props.data.title}
                      ></CabezeraModal>
                      {
                      props.data.sections.map((item)=>{
                        
                        const dts = transformarLogData(props.dt);
                       
                        return(
                            <div key={item.id} className="row mt-3">
                                {
                                    item.fields.map((field,index)=>(
                                        <div key={index} >
                                            <CampoForm
                                             input={field? field.input : ""}
                                             label={field.label}
                                                defaultValue={dts.row?.[field.id] || ""}
                                             campo={field.id}
                                             readOnly={field.readOnly}
                                             type={field.type}
                                             state={field.state}
                                             classname={`col-md-${field.cols}`}
 >
                                            </CampoForm>
                                        </div>
                                    ))
                                }
                            </div>
                        )

                      })
                    }
                </div>
            </div>
        </form>
        </>
    );
}

export default CustomFormMostrar;