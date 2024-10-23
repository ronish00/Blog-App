import React from 'react'

const Button = ({
    type = "button",
    children,
    className = "",
    ...props
}) => {
  return (
    <button className={`w-full bg-black text-white rounded px-4 py-3 ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button
