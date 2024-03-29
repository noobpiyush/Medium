import { Link } from "react-router-dom"
import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"


export const FullBlog = ({ blog }: { blog: Blog }) => {

    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full max-w-screen-xl pt-12 ">

                <div className="col-span-8">
                    <div className=" text-xl font-medium lg:font-extrabold lg:text-5xl">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-4">
                        Post on 2nd December 2023
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-slate-600 text-lg ">
                        Author
                    </div>
                    <div className="flex w-full">
                        <div className="pr-4 flex justify-center flex-col">
                        <Avatar size="big" name={blog.author.name.toUpperCase() || "Anonmous"}/>
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {blog.author.name ? (blog.author.name.charAt(0).toUpperCase() + blog.author.name.slice(1).toLowerCase()) : "Anonymous"}
                            </div>
                            <div className="pt-2">
                                Welcome to Medium clone {blog.author.name ? (blog.author.name.charAt(0).toUpperCase() + blog.author.name.slice(1).toLowerCase()) : "Anonymous"} Made by <Link className="cursor-pointer underline" target="_blank" to={`https://twitter.com/DevRishiPiyush`}> Piyush</Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>

}

