"use client";
import Image from "next/image";
import Link from "next/link";
interface CardProps {
    searchType?:string;
    bookId?: string;
    bookName: string;
    authorId?: string;
    authorName: string;
    imageUrl: string;
}

const Card = ({ 
    bookId = "None", 
    bookName, 
    authorName, 
    imageUrl, 
    authorId = "None", 
    searchType = "Title"
 }: CardProps) => {
    return (
        <Link 
            className={`w-70 h-110 rounded-3xl bg-gray-200 transition-all duration-300 hover:bg-gray-300 flex flex-col items-center justify-between hover:scale-105`} 
            href={searchType === "Title" ? `/book/${encodeURIComponent(bookId)}` : `/author/${encodeURIComponent(authorId)}`}
        >
            <div className={`w-full h-4/5 rounded-3xl`}>
                <Image src={imageUrl} alt={"Image"} className={`w-full h-full object-cover rounded-3xl`} width={200} height={300} priority={false} />
            </div>
            <div className={`w-full h-1/5 flex flex-col justify-center items-start`}>
                <span className={`text-xl font-bold w-full h-10 p-2 flex items-center justify-start`}>{bookName}</span>
                <span className={`text-md w-full h-6 p-2 flex items-center justify-end ${!authorName && 'invisible'}`}>~{authorName}</span>
            </div>
            
        </Link>
    )
}

export default Card;