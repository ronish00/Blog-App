import React from 'react'

const Button = ({
    type = "button",
    children,
    className = "",
    ...props
}) => {
  return (
    <button className={`${className} w-full bg-black text-white rounded px-4 py-3`} {...props}>
      {children}
    </button>
  )
}

export default Button
