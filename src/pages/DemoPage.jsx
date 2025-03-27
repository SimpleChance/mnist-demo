// DemoPage.jsx
import React from "react";
import Canvas from "../components/Canvas";
import Prediction from "../components/Prediction";
import useGrid from "../hooks/gridStateManager";
import "../styles/DemoPage.css";

/** Demo page component.
 *
 * @component
 * @returns {JSX.Element} The demo page component.
 */
const DemoPage = () => {
    // Shared grid state for the Canvas and Prediction components.
    const gridState = useGrid();

    return (
        <div className="demo-page">
            <Canvas {...gridState} />
            <Prediction {...gridState} />
        </div>
    );
};

export default DemoPage;
