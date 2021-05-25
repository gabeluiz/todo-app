import useSWR from "swr";

export default function useFetch(url) {
  const { data, error, mutate } = useSWR(url, async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    
    return data;
  });

  return { data, error, mutate };
}