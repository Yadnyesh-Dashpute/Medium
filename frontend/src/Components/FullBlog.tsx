import { Appbar } from "./Appbar"


export const FullBlog = ({blog}: {blog:Blog}) => {
    return <div>
        <Appbar/>
     <div className="grid grid-cols-12 px-10 pt-200">
        <div className="grid-cols-8 col-span-8">
            {blog.title}
        </div>
        <div className="col-span-4">
            {blog.content}
        </div>
    </div>
</div>
}