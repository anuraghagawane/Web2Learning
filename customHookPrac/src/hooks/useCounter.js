import { useState } from "react";

function useCounter() {
    const [count, setCounter] = useState(0);

    function increment() {
        setCounter(count + 1);
    }

    return {
        count,
        increment,
    };
}

export default useCounter;