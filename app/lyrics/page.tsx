import Header from "@/components/Header";
import LyricsComponent from "@/providers/lyricsApi";
import LyricsContent from "./components/LyricsContent";


const lyrics = () => {
    return ( 
     <div
        className="
            bg-neutral-900
            rounded-lg
            h-full
            w-full
            overflow-hidden
            overflow-y-auto
        "
        >
        <Header className="from-bg-neutral-900">
            
        </Header>
        <LyricsContent/>
       </div>
     );
}
 
export default lyrics;