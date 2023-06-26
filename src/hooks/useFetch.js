import { useState, useEffect } from "react";

export default function useFetch(url, options) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(url, options);
                const json = await response.json();
                setData(json);
                setLoading(false);
            }catch (error) {
                setError(error);
                setLoading(false);
            }
        })()}, [url, options]);

        return { loading, data, error };
}