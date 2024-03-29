import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    title: string,
    content: string;
    publishedDate: string
    id:string
}
export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate,
    id 
}: BlogCardProps) => {
    
    return <Link to={`/blog/${id}`}>
        <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
            {<Avatar size="small" name={authorName} />}
            <div className="font-extralight pl-2 text-sm  flex f justify-center flex-col">      {authorName}
            </div>
            <div className="flex justify-center flex-col pl-2 ">
                <Circle />
            </div>
            <div className="pl-2 font-thin text-slate-400 text-sm flex f justify-center flex-col">{publishedDate}
            </div>
        </div>
        <div className="text-xl font-semibold pt-2">
            {title}
        </div>
        <div className="text-base font-thin">
            {content.length >= 100 ? content.slice(0, 100) + "...." : content}
        </div>
        <div className="text-slate-500 text-sm font-thin pt-4">
            {`${Math.ceil(content.length / 100)} minutes`}
        </div>
    </div>
    </Link>
}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}

export function Avatar({ name, size = "small" }: { name: string, size: "small" | "big" }) {
    return <div className={`relative inline-flex items-center justify-center  overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"} `}>
        <span className={` ${size === "small" ? "text-xs" : "text-lg"}   font-extralight text-gray-600  dark:text-gray-300`}>
            {(name[0].toLocaleUpperCase())}
        </span>
    </div>

}
