"use client";

import LyricsProvider from "@/providers/LyricsProvider";


const LyricsContent = () => {
    return ( 
        <div className="
                flex
                flex-col
                gap-y-2
                w-full
                px-6
                text-neutral-400
            
            ">
                <LyricsProvider/>
            </div>
     );
}
 
export default LyricsContent;