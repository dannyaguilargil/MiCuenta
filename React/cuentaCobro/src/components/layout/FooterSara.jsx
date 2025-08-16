import React from 'react'

function FooterSara() {
  return (
    <>  
     
      <footer className=" container py-4  mt-auto h-auto bg-body-tertiary">
    <div className="container-fluid px-4">
    <div className="d-flex flex-wrap gap-3 align-items-center justify-content-between small">
      <div className="text-body-secondary">
        "Lo que debe hacerse, requiere ser bien hecho"
      </div>
      <div className='d-flex gap-3 flex-wrap'>
        <div className="form-check responsive">
          <input 
            className="form-check-input" 
            type="checkbox" 
            id="cbox1" 
            defaultChecked 
            readOnly
          />
          <label 
            className="form-check-label text-body-secondary" 
            htmlFor="cbox1"
          >
            <a href="#" className="text-reset text-decoration-none">
              Acuerdo de confidencialidad
            </a>
          </label>
        </div>
        
        <div className="form-check">
          <input 
            className="form-check-input" 
            type="checkbox" 
            id="cbox2" 
            defaultChecked 
            readOnly
          />
          <label 
            className="form-check-label text-body-secondary" 
            htmlFor="cbox2"
          >
            <a href="#" className="text-reset text-decoration-none">
              Tratamiento de datos personales
            </a>
          </label>
        </div>
      </div>
    </div>
  </div>
</footer>
    </>
  )
}

export default FooterSara


