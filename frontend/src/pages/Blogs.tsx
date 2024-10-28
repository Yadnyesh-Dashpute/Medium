import { useEffect, useState } from "react";
import { Appbar } from "../Components/Appbar";
import { BlogCard } from "../Components/Blogcard";
import axios from "axios";
import { BACKEND_URL } from "../pages/Config";

// import { useBlogs } from "../hooks";

export interface Blog {
    content:string;
    title:string;
    id:string;
    author: {
        name:string
    }

}

export const Blogs = () => {
    // const { loading, blogs } = useBlogs();
    const [loading,setLoading] = useState(true);
    const [blogs, setBlogs] = useState<any[]>([]);

    useEffect( () => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
            console.log("API Response:", response.data);
            setBlogs(response.data.blog);
            console.log(blogs)
            setLoading(false);
        })
    }, [])
    if (loading) {
        return <div>Loading.....</div>;
    }


    return (
        <>
            <Appbar />
            <div className="flex justify-center">
                <div>

                    {/* {blogs && blogs.map(blog => (
                            <BlogCard

                                authorName={blog.author.name || "Anonymous"}
                                title={blog.title}
                                content={blog.content}
                                publishedDate={"2nd Feb 2024"}
                            />
                        ))
                    } */}
                    {
                        blogs
                    }
                </div>
            </div>
        </>
    );
};
