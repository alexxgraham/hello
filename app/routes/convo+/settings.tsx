import { useEffect, useState } from "react";
//MAIN {cn(
//     generateFontClass({ size: useFontSize, style: useFontStyle }),
//     "bg-primary text-primary-foreground h-full overflow-hidden flex flex-col",
// )}

// DIV1 {cn(
//     fontColorChoice,
//     "h-full flex flex-col px-4 mt-8 mb-16 overflow-y-scroll gap-7",
// )}

// SMALL {cn(
//     "italic mt-20",
//     colorMaps({ color: "DARK_GRAY", mapKind: "text" }),
// )}

export default function ConvoSettings() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <main className="bg-primary text-accent h-full overflow-hidden flex flex-col ibm-text">
            <div className="h-full flex flex-col px-4 overflow-y-scroll gap-7">
                <div className={`flex justify-center absolute h-full w-full top-0 left-0 bg-ring pointer-events-none transition ease-in delay-150 duration-1000 ${loading ? "opacity-100" : `opacity-0`}`}>
                    <small className="italic mt-20">
                        Loading...
                    </small>
                </div>
                <article className="h-full my-8">
                    <h1>Settings</h1>
                </article>
            </div>
      </main>
    )
}