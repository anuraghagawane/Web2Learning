import { useEffect, useState } from "react";

function useFetch(url) {
    const [data, setData] = useState();

    async function refetch() {
        const response = await fetch(url, {
            method: "GET"
        });
        const json = await response.json();
        setData(json);
    }

    useEffect(() => {
        (async () => {
            const response = await fetch(url, {
                method: "GET"
            });
            const json = await response.json();
            setData(json);
        })();
    }, [url])

    return { data, refetch };
}

export default useFetch;