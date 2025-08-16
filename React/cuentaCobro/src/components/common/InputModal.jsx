import React from "react";

function CampoInputModal(props) {

  const renderInput = () => {
    switch (props.input) {
      case "select":
        return (
          <select
            name={props.campo}
            id={props.campo}
            className="form-control"
            // value={props.value}
            readOnly={props.readOnly}
            disabled={props.disabled || props.state}
            onChange={props.onChange}
            required={props.required}
          >
            <option  value={props.defaultValue} disabled selected hidden={props.ocultarseleccion} >{props.defaultValue}  </option>
            {props.option?.map((val, index) => (
              <option key={index} value={String(val).toUpperCase()}>
                {String(val).toUpperCase()}
              </option>
            ))}
          </select>
        );
      case "input":
        return (
          <input
            type={props.type || "text"}
            name={props.campo}
            id={props.campo}
            className="form-control"
            value={props.defaultValue ? undefined : props.value}
            defaultValue={props.defaultValue}
            readOnly={props.readOnly}
            disabled={props.state}
            onChange={props.onChange}
            required={props.required}
            placeholder={props.placeholder ?? ""}
            maxLength={props.maxLength}
          />
        );
        case "radio":
          return (
            <div className="d-flex gap-3 flex-wrap">
              {props.option.map((option) => (
                <div key={option.value} className="form-check">
                  <input
                    type={props.type}
                    name={props.campo}
                    id={`${props.campo}-${option.value}`}
                    className="form-check-input"
                    value={option.value}
                    checked={String(props.defaultValue).toUpperCase() === String(option.value).toUpperCase()}
                    readOnly={props.readOnly}
                    disabled={!props.state}
                    onChange={props.onChange}
                    required={props.required}
                  />
                  <label htmlFor={`${props.campo}-${option.value}`} className="form-check-label">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          );
          case "textarea":
        return (
          <textarea
            name={props.campo}
            id={props.campo}
            className="form-control"
            value={props.defaultValue ? undefined : props.value}
            defaultValue={props.defaultValue}
            readOnly={props.readOnly}
            disabled={props.state}
            required={props.required}
            onChange={props.onChange}
            placeholder={props.placeholder ?? ""}
            rows={props.spanbox}
          />
        );
        case "file":
          return(
              <input 
                  type={props.type}
                  name={props.campo}
                  id={props.campo}
                  multiple={props.multiple ?? null}
                  required={props.required}
                  className={props.class ?? ""}
                  onChange={props.onChange}
               />
          );
          case "number":
          return(
              <input 
                  type={props.type}
                  name={props.campo}
                  id={props.campo}
                  min={props.min}
                  max={props.max}
                  readOnly={props.readOnly}
                  required={props.required}
                  className={props.class ?? ""}
                  onChange={props.onChange}
               />
          );

          case "date":
          return(
              <input 
                  type={props.type}
                  name={props.campo}
                  id={props.campo}
                  required={props.required}
                  className={props.class ?? ""}
                  onChange={props.onChange}
               />
          );
          case "datalist":
        return (
          <>
            <input
              className="form-control"
              list={`datalist-${props.campo}`}
              name={props.campo}
              id={props.campo}
              onChange={props.onChange}
              placeholder={props.defaultValue}
            />
            <datalist id={`datalist-${props.campo}`}>
              {props.option?.map((val, index) => (
                <option key={index} value={String(val).toUpperCase()}>
                  {String(val).toUpperCase()}
                </option>
              ))}
            </datalist>
          </>
        );
    }
  };

  return (
    <div className={props.className}>
      <label htmlFor={props.campo}>
        <b>{props.label}</b>
      </label>
      {renderInput()}
    </div>
  );
}

export default CampoInputModal;
