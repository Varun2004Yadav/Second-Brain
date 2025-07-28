import { ShareIcon } from "../icons/ShareIcon";

interface CardProp{
    title: string;
    link: string;
    type: "twitter" | "youtube"
}


export function Card({title,link,type}: CardProp) {
    return (
        <div >
            <div className="p-8 bg-white rounded-md  border border-gray-200 w-72 ">

                <div className="flex justify-between text-md">
                    <div className="flex items-center">
                        <div className="pr-2 text-gray-500">
                            <ShareIcon size="sm" />
                        </div>
                        {title}
                    </div>
                    <div className="flex items-center">
                        <div className="pr-2 text-gray-500">
                            <a href={link} target ="_blank">
                            <ShareIcon size="sm" />
                            </a>
                        </div>
                        <div className="pr-2 text-gray-500">
                            <ShareIcon size="sm" />
                        </div>
                    </div>
                </div>
                <div className="pt-8">
                    {type === "youtube" &&  <iframe className="w-full" src={link.replace("watch","embed".replace("?v=", "/"))} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
                   {type === "twitter" && <blockquote className="twitter-tweet">
                        <a href={link.replace("x.com", "twitter.com")}></a>
                    </blockquote>}
                </div>
            </div>
        </div>
    )
}