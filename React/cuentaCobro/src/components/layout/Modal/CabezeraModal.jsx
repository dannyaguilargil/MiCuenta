import React from 'react'
import { isDarkModeEnabled } from '../../../utils/utils';

function CabezeraModal(props) {
  return (
        <div
            className={props.icon ? "d-flex justify-content-between card-header":"card-header"}
            style={{
              backgroundColor: props.background,
            }}>
            <h6 className="card-title ">{props.title}</h6>
            {
               props.icon ? <a style={{background:"none" , border:"none", cursor:"pointer"}} onClick={props.event}>
               {
                 props.icon
               }
             </a>
             :null
            }
           
            
        </div>
  )
}

export default CabezeraModal;