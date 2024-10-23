import React, {useId} from 'react'

const Input = ({
    type,
    label,
    placeholder,
    className ="",
    ...props
}, ref) => {

    const id = useId()

  return (
    <div className='w-full flex flex-col gap-3'>
        {
            label && (
                <label 
                    htmlFor={id}
                    className=''
                >
                {label}
                </label>
            )
        }
      <input 
        type={type} 
        id={id} 
        ref={ref} 
        {...props}
        placeholder={placeholder}
        className={`${className} border border-[#ddd] px-3 py-3 rounded`}
      />
    </div>
  )
}

export default React.forwardRef(Input);
