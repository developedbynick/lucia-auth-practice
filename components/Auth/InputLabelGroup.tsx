import React from 'react'

interface FCProps {
  label: string;
  labelTextContent: string;
  inputType: React.InputHTMLAttributes<HTMLInputElement>['type'];
  inputPlaceholder: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
}

const InputLabelGroup = (props: FCProps) => {
  return (
    <div className="input-container">
      <label htmlFor={props.label}>{props.labelTextContent}</label>
      <input type={props.inputType} name={props.label} placeholder={props.inputPlaceholder} />
    </div>
  )
}

export default InputLabelGroup