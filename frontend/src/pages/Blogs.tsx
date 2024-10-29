import { useEffect, useState } from "react";
import { Appbar } from "../Components/Appbar";
import { BlogCard } from "../Components/Blogcard";
import { BACKEND_URL } from "../pages/Config";
import { BlogSkeleton } from "../Components/BlogSkeleton";


export interface Blog {
    content: string;
    title: string;
    id: string;
    author?: {
        name?: string
    }
}

export const Blogs = () => {
    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {

        async function getBlogs() {
            const res = await fetch(`${BACKEND_URL}/api/v1/blog/bulk`, {
                headers: {
                    Authorization: localStorage.getItem("token") || ""
                }
            })
            const json = await res.json();
            console.log(json)
            setBlogs(json.blog)
            console.log('blog', blogs)
            if (blogs.length > 0) {
                setLoading(false);
            }
        }
        getBlogs()
    }, [])
    if (loading) {
        return <div>
            <BlogSkeleton/>
            <BlogSkeleton/>
            <BlogSkeleton/>
            <BlogSkeleton/>
            </div>;
    } 
    return (
        <>
        <Appbar />
        <div className="flex justify-center">
      <div className="max-w-xl">
        {
            blogs && blogs.map(blog => (
                <BlogCard
                            id= { blog.id }
                            authorName = { blog.author && blog.author.name ? blog.author.name : "Anonymous" }
                            title = { blog.title }
                            content = { blog.content }
                            publishedDate = { "2nd Feb 2024"}
                />
                    ))
}

</div>
</div>
    </>
);
};
