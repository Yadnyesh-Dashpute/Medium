import { ChangeEvent, useState } from "react"
import { Appbar } from "../Components/Appbar"
import axios from "axios";
import { BACKEND_URL } from "./Config";
import { useNavigate } from "react-router-dom";



export const Publish = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    return <div>
        <Appbar />

        <div className="flex justify-center w-full pt-8">
            <div className="pt-4 max-w-screen-lg w-full">
                <textarea onChange={(e) => {
                    setTitle(e.target.value)
                }}
                    className="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Title"></textarea>


        <TextEditor onChange={(e) => {
            setDescription(e.target.value)
        }} />
        <div>
            <button onClick={async () => {
                const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                    title,
                    content : description
                }, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                })
                navigate(`/blog/${response.data.id}`)
            }}
                type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                Publish post
            </button>
        </div>
    </div>
    </div>
    </div>
}


function TextEditor({ onChange }: { onChange: ( e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    return <div className="flex justify-center">

        <div className="max-w-screen-lg w-full mt-4">
            <div className="flex justify-center flex-col ">
                <div className="w-full mb-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between px-3 py-2">
                        <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse">
                            <div className="flex items-center space-x-1 rtl:space-x-reverse sm:pe-4">




                            </div>
                            <div className="flex flex-wrap items-center space-x-1 rtl:space-x-reverse sm:ps-4">



                            </div>
                        </div>


                    </div>
                    <div className="px-4 py-2 bg-white rounded-b-lg ">
                        <label className="sr-only">Publish post</label>
                        <textarea onChange={onChange} className="focus:outline-none pl-2 block w-full px-0 text-sm text-gray-800 bg-white border-0 " placeholder="Write an article..." required ></textarea>
                    </div>
                </div>
            </div>
            {/* <button type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                Publish post
            </button> */}
        </div>
    </div>
}