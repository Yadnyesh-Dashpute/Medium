import { useEffect,useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../pages/Config";


export interface Blog {
    content:string;
    title:string;
    id:string;
    author: {
        name:string
    }

}

export const useBlogs = () => {
    const [loading,setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect( () => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
            console.log("API Response:", response.data);
            setBlogs(response.data.blogs);
            setLoading(false);
        })
    }, [])

    return {
        loading,
        blogs
    }


}