import React from 'react'

export const Input = ({
    placeholder,
    type,
    value,
    setValue
}) => {
    const handleChange = (e) => {
        setValue(e.target.value)
    }
    return (
        <input
            value={value}
            type={type}
            className="text-white bg-[#19406B] px-4 p-3 w-100 border-sky-200 rounded-xl mt-15"
            placeholder={placeholder}
            onChange={handleChange}
        >

        </input>
    )
}

export const OtpInput = ({
    otp,
    index,
    setOtp,
    reference,
    refs
}) => {
    const handleChange = (e) => {
        console.log(e)
        if (e.key === "Backspace") {
            setOtp((prev) => {
                const newArr = [...prev];
                newArr[index] = "";
                return newArr;
            })
            refs[index - 1]?.current.focus();
            return;
        }
        setOtp((prev) => {
            const newArr = [...prev];
            newArr[index] = e.key;
            return newArr;
        })
        refs[index + 1]?.current.focus();
    }
    return (
        <input
            key={index}
            ref={reference}
            value={otp[index]}
            type="number"
            className="text-white bg-[#19406B] px-4 p-3 w-12 border-sky-200 rounded-xl mt-15 m-2 pl-5"
            // onChange={handleChange}
            onKeyDown={handleChange}
        >
        </input>
    )
}