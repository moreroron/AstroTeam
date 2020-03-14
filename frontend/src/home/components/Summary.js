import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';

const Summary = () => {

    const [drawTitle, setDrawTitle] = useState("Draw!");

    const canvasRef = useRef(null);

    const handleCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.font = "30px";
        ctx.fillText("Astro-Team Canvas Drawing", 10, 25);
        setDrawTitle("Draw harder");
    };

    return (
        <>
            <p className="is-size-3 title-secondary">WHO ARE WE?</p>
            <p className="is-size-4 three-col">
                Astro-team is a web application delivered for teams to
                better comunicate with each other.
                Our platform gives teams the ability to assign missions between members
            and also supplies a dedicated <Link to={'/chat'}><span className="shadowing">chat room</span></Link> for instant feedback.
            </p>

            {/* canvas */}
            <div className="m-t-lg">
                <button onClick={handleCanvas} className="button">{drawTitle}</button>
                <canvas width="200" ref={canvasRef} height="100">
                </canvas>
            </div>
        </>
    )
}

export default Summary