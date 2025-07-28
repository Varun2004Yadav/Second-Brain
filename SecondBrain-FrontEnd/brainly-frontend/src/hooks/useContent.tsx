import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export default function useContent() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null); // ✅ type updated

   async function fetchData() {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
          headers: {
            "token": localStorage.getItem("token")
          }
        });
        setContents(response.data.content);
       
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("Unknown error"));
        }
      } finally {
        setLoading(false);
      }
    }
    
  useEffect(() => {
    fetchData();
   let interval = setInterval(()  => {
      fetchData();
    },5000)
   
    return () => {
      clearInterval(interval);
    }
  }, []);

  return { fetchData, contents, loading, error  };
}
