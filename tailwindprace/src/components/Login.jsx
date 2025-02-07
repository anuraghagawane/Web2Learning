import { useState, useMemo, useRef, useEffect } from 'react'
import Button from './Button'
import { Input, OtpInput } from './Input'

const Login = () => {
    const [currentScreen, setCurrentScreen] = useState(1);
    const [year, setYear] = useState();
    const [email, setEmail] = useState();
    return (
        <>
            {currentScreen === 1 && <Screen1 year={year} setYear={setYear} setCurrentScreen={setCurrentScreen} />}
            {currentScreen === 2 && <Screen2 email={email} setEmail={setEmail} setCurrentScreen={setCurrentScreen} />}
            {currentScreen === 3 && <OtpScreen email={email} />}
        </>
    )
}

const Screen1 = ({ setCurrentScreen, year, setYear }) => {
    const isValid = useMemo(() => {
        return year >= 1900 && year <= ((new Date).getFullYear())
    }, [year]);

    return (
        <div className="flex flex-col items-center">
            <div className="flex mt-20">
                <h1 className="text-[#3bd3c7] text-4xl font-medium">Webinar</h1>
                <h1 className="text-white text-4xl font-medium">.gg</h1>
            </div>
            <h3 className="text-white text-4xl font-medium mt-20">Verify your age</h3>
            <p className="text-neutral-200 text-lg font-light mt-15">Please confirm your birth year. This data will not be stored.</p>
            <Input value={year} setValue={setYear} placeholder="Your Birth Year" type="number" />
            <Button isValid={isValid} onClick={() => isValid && setCurrentScreen(2)}>Continue</Button>
        </div>
    )
}

const Screen2 = ({ email, setEmail, setCurrentScreen }) => {
    const isValid = useMemo(() => {
        return email?.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }, [email]);

    return (
        <div className="flex flex-col items-center">
            <div className="flex mt-20">
                <h1 className="text-[#3bd3c7] text-4xl font-medium">Webinar</h1>
                <h1 className="text-white text-4xl font-medium">.gg</h1>
            </div>
            <h3 className="text-white text-4xl font-medium mt-20">Let's Get Started</h3>
            <Input setValue={setEmail} value={email} placeholder="Email Id" type="text" />
            <Button isValid={isValid} onClick={() => isValid && setCurrentScreen(3)}>Continue</Button>
        </div>
    )
}

const fomattedTime = (time) => {
    let minutes = parseInt(time / 60);
    let seconds = time % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return `${minutes}:${seconds}`
}


const OtpScreen = ({ email }) => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [refs, setRefs] = useState(otp.map((o, i) => useRef(i)));
    const [time, setTime] = useState(30);
    const timer = useRef();

    useEffect(() => {
        timer.current = setInterval(() => {
            setTime(prev => {
                if (prev <= 1) {
                    clearInterval(timer.current);
                }
                return prev - 1
            });
        }, 1000);

        return () => clearInterval(timer.current);
    }, []);

    const isValid = useMemo(() => {
        return otp.map((o) => o !== null && o !== "").every(e => e);
    }, [otp]);
    return <>
        <div className="flex flex-col items-center">
            <div className="flex mt-20">
                <h1 className="text-[#3bd3c7] text-4xl font-medium">Webinar</h1>
                <h1 className="text-white text-4xl font-medium">.gg</h1>
            </div>
            <h3 className="text-white text-4xl font-medium mt-20">Check Your Email For A Code</h3>
            <p className="text-neutral-200 text-lg font-light mt-15">Please Enter the verification code sent to your email id <span className="font-medium">{email}</span></p>
            <div>
                {otp.map((o, i) => {
                    return <OtpInput key={i} index={i} otp={otp} setOtp={setOtp} reference={refs[i]} refs={refs} />
                })}
            </div>
            <div className="text-neutral-200 font-light">{fomattedTime(time)}</div>
            <Button isValid={isValid}>Continue</Button>
        </div>
    </>
}


export default Login