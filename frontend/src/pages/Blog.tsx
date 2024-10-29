import { useEffect, useState } from "react";
import { BACKEND_URL } from "../pages/Config";
import { Appbar } from "../Components/Appbar";
import { useParams } from "react-router-dom";
import { Avatar } from "../Components/Blogcard";

export interface Blog {
    content: string;
    title: string;
    id: string;
    author?: {
        name?: string;
    };
}

export const Blog = () => {
    const [loading,setLoading] = useState(false);
    const [blog, setBlog] = useState<Blog>();
    const {id} = useParams<{id:string}>();
    useEffect(() => {
        async function useBlog(blogId : string ) {
            const res = await fetch(`${BACKEND_URL}/api/v1/blog/${blogId}`, {
                headers: { 
                    Authorization: localStorage.getItem("token") || "",
                },
            });
            const json = await res.json();
            setBlog(json.blog);
            setLoading(false)
        }
        if(id){
            useBlog(id);
        }
    }, [id]);

    if(loading || !blog){
        return <div>
            Loading..;
        </div>
    }

    return (
        <>
            <Appbar />
            <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
                <div className="grid-cols-8 col-span-8">
                    <div className="text-5xl font-extrabold">
                    {blog ? blog.title : "Loading..."}
                </div>
                <div className="text-slate-300">
                    Post on 2nd December 2024
                </div>
                <div className="pt-4">
                    {blog ? blog.content : "Loading..."}
                </div>
                </div>
                

                <div className="col-span-4">
                    <div className="text-slate-500">
                    Author
                    </div>
                <div className="flex w-full">
                    <div className="pr-4 flex flex-col justify-center">
                    <Avatar size="big" name={blog?.author?.name || "Anonymous"} />
                    </div>
                    <div>
                <div className="text-xl font-bold">
                    {blog?.author?.name || "Anonymous"}
                    </div>
                <div className="pt-2 text-slate-500">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam eligendi omnis praesentium in adipisci pariatur et consequatur vitae dicta esse?
                </div>
                </div>
                </div>
                </div>
                </div>
            </div>
        </>
    );
};
