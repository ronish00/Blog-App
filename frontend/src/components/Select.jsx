import React, {useId} from 'react'

const Select = ({
    type,
    label,
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
      <select  
        id={id} 
        ref={ref} 
        className={`${className} border border-[#ddd] px-3 py-3 rounded`}
        {...props}
      >
        <option value="" disabled>Please select a category</option>
        <option value="technology">Technology</option>
        <option value="lifestyle">Lifestyle</option>
        <option value="fashion">Fashion</option>
        <option value="game">Game</option>
        <option value="education">Education</option>
        <option value="travel">Travel</option>
      </select>
    </div>
  )
}

export default React.forwardRef(Select);
