import React from 'react'

const Input = ({
    type,
    label,
    placeholder,
    className ="",
    id,
    error,
    ...props
}, ref) => {

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
        placeholder={placeholder}
        className={`${className} border ${error ? 'border-red-600' : 'border-[#ddd]'}  px-3 py-3 rounded`}
        {...props}
      />
      {
        error && <p className='text-red-600 text-sm'>{error}</p>
      }
    </div>
  )
}

export default React.forwardRef(Input);
