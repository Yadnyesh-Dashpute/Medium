import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id:string;

}


export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {

    return <Link to={`/blog/${id}`}>
     <div className=" p-4 border-b-2 border-slate-200 pb-4 cursor-pointer">
        <div className="flex mt-2">
            <div className="flex justify-center flex-col">
                <Avatar size={"small"} name={authorName} />
            </div>
            <div className="font-extralight pl-2 flex justify-center flex-col">{authorName}</div>
            <div className=" flex justify-center flex-col pl-2 text-slate-500"> &#9679; </div>
            <div className="flex justify-center flex-col pl-2 font-light text-sm text-slate-600">
                {publishedDate}
            </div>
        </div>
        <div className="mt-2 text-xl font-semibold">
            {title}
        </div>
        <div className="text-md font-thin text-slate-400">
            {content.slice(0, 100) + "...."}
        </div>
        <div className="w-full text-slate-400 mt-4 font-thin">
            {`${Math.ceil(content.length / 100)} minutes read`}
        </div>

    </div>
</Link>
}


export function Avatar({ name, size ="small" }: { name: string, size:"small" | "big"}) {
    return <div className={`relative inline-flex items-center justify-center w-7 h-7 overflow-hidden bg-green-700 rounded-full dark:bg-gray-600" ${size==="small" ? "w-6 h-6" : "w-10 h-10"}`}>
        <span className={`${size==="small" ? "text-xs" : "text-md"} "text-xs text-gray-600 dark:text-gray-300`}>{name[0]}</span>

    </div>

}