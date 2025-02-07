import React from 'react'

const Button = ({ children, onClick, isValid }) => {
    return (
        <span
            onClick={onClick}
            className={`${isValid ? "bg-[#3FE0CF]" : "bg-[#7F95AC]"} ${isValid ? "text-black hover:cursor-pointer" : "text-white"} font-medium w-100 flex justify-center p-3 mt-10 rounded-xl`}
        >
            {children}
        </span >
    )
}

export default Button