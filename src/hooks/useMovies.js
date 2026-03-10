import { useState, useEffect, useRef } from 'react';

export default function useMovies(fetcher) {
  const [movies, setMovies]         = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const fetcherRef = useRef(fetcher);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetcherRef.current()
      .then(data => {
        if (!cancelled) {
          setMovies(data.results || []);
          setTotalPages(data.total_pages || 0);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err);
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, []);

  return { movies, loading, error, totalPages };
}
