
function Label({ label, isRequired }) {
    return (
      <label className="label">
        {label}
        {isRequired && <span style={{ color: 'orange', fontWeight:"bold" }}>*</span>}
      </label>
    )
  }
  
  function Error({ touched, error }) {
    return (
      <div>
        <div className="error">{touched && error}</div>
      </div>
    )
  }
  
export default function Input({
    type, 
    label, 
    name, 
    placeholder,
    value,
    onChange,
    onBlur,
    isRequired,
    touched,
    errors
  }) {
    const commonProps = {
      name,
      value,
      placeholder,
      onChange,
      onBlur,
      className: errors[name] ? 'input-error' : ''
    }
    return (
      <div className="form-item">
        <Label label={label} isRequired={isRequired} />
        <div>
          {
            {
              input: <input type="text" {...commonProps} />,
              textarea: <textarea rows="4" {...commonProps} />,
              date: <input type="date" {...commonProps} />,
              number: <input type="number" {...commonProps} />,
              checkbox: <input type="checkbox" {...commonProps} />,
              radio: <input type="radio" {...commonProps} />
            }[type || 'input']
          }
          <Error touched={touched[name]} error={errors[name]} />
        </div>
      </div>
    )
  }
  