import { Avatar } from "./Blogcard"

export const Appbar = () => {
    return <div className="border-b flex justify-between px-10 py-3">

        <div className="flex flex-col justify-center">
            Medium
        </div>
        <div>
            <Avatar size={"big"} name="Yadnyesh"/>
        </div>
    </div>
}