import React, { useEffect } from "react";

const Twitter = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        document.getElementsByClassName("twitter-embed")[0].appendChild(script);
    }, []);

    return (
        <div className="columns is-centered m-t-xxl">
            <section className="twitterContainer">
                <div className="twitter-embed">
                    <a
                        className="twitter-timeline"
                        data-width="500"
                        data-height="500"
                        href="https://twitter.com/AstroTeam6?ref_src=twsrc%5Etfw"
                    >
                        Tweets by HeyMarkKop
        </a>
                </div>
            </section>
        </div>

    );
};

export default Twitter