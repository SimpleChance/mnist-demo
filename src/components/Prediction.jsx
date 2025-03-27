// Prediction.jsx
import React, { useState, useEffect } from "react";
import "../styles/Prediction.css";
import { loadModel, predictFromGrid } from "../utils/predictUtils";

// Mapping dictionary for MNIST & EMNIST ByMerge (10 & 47 classes).
const mapping = {
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "A",
    11: "B",
    12: "C",
    13: "D",
    14: "E",
    15: "F",
    16: "G",
    17: "H",
    18: "I",
    19: "J",
    20: "K",
    21: "L",
    22: "M",
    23: "N",
    24: "O",
    25: "P",
    26: "Q",
    27: "R",
    28: "S",
    29: "T",
    30: "U",
    31: "V",
    32: "W",
    33: "X",
    34: "Y",
    35: "Z",
    36: "a",
    37: "b",
    38: "d",
    39: "e",
    40: "f",
    41: "g",
    42: "n",
    43: "q",
    44: "r",
    45: "t",
    46: "y"
};

/** Prediction component for displaying the model's prediction probabilities.
 * 
 * @component
 * @param {boolean[][]} grid - The grid state to make predictions from.
 * @returns {JSX.Element} The prediction component.
 */
const Prediction = ({ grid }) => {
    // States for the TensorFlow.js model and prediction.
    const [model, setModel] = useState();
    const [prediction, setPrediction] = useState([]);

    // Load the TensorFlow.js model when the component mounts.
    useEffect(() => {
        async function initializeModel() {
            const loadedModel = await loadModel(`${process.env.PUBLIC_URL}/data/model_bymerge_v1/model.json`);
            setModel(loadedModel);
        }
        initializeModel();
    }, []);

    // Update prediction whenever the grid changes and the model is loaded.
    useEffect(() => {
        if (model) {
            predictFromGrid(grid, model).then((pred) => setPrediction(pred));
        }
    }, [grid, model]);
      
    // Compute the class with the highest probability.
    let bestPredictionClass = null;
    if (prediction && prediction.length > 0) {
        bestPredictionClass = prediction.reduce(
            (max, curr) => curr.raw > max.raw ? curr : max).digit;
    }

    if (!prediction.length) {
        return <p className="prediction">Draw something to see a prediction…</p>;
    }

    return (
        <div className="prediction">
            <h3>Prediction Probabilities</h3>
            <div className="prediction-vertical-bars">
                {prediction.map((p) => {
                    const isBest = p.digit === bestPredictionClass;
                    const barHeight = `${p.probability}`;
                    return (
                        <div
                            key={p.digit}
                            className={`vbar-column ${isBest ? "highlight" : ""}`}
                        >
                            <div className="vbar">
                                <div className="vbar-fill" style={{ height: barHeight}}></div>
                            </div>
                            <span className="vbar-label">{mapping[p.digit]}</span>
                        </div>
                    );
                })}
            </div>
            <p className="note">The tallest (green) bar is the model's best guess.</p>
        </div>
    );
};

export default Prediction;
