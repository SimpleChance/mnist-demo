import React, { useState, useEffect } from "react";
import "../styles/Canvas.css";
import useGrid from "../hooks/gridStateManager";
import { loadModel, predictFromGrid } from "../utils/predictUtils";

// Mapping dictionary for EMNIST ByMerge (47 classes).
// Adjust these values if your mapping differs.
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

/**
 * Canvas component for drawing on a 28x28 grid and making predictions.
 *
 * @component
 * @returns {JSX.Element} The canvas component.
 */
const Canvas = () => {
  // Use custom hook to manage grid state.
  const { grid, setCell, resetGrid } = useGrid();
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState(null);

  // Load the TensorFlow.js model when the component mounts.
  useEffect(() => {
    async function initializeModel() {
      // Ensure the model files are served from the public folder.
      const loadedModel = await loadModel("/model_bymerge_v1/model.json");
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

  // Handle mouse events.
  const handleMouseDown = (rowIndex, colIndex, button) => {
    if (button === 0) {
      setIsDrawing(true);
      setCell(rowIndex, colIndex, true);
    } else if (button === 2) {
      setIsErasing(true);
      setCell(rowIndex, colIndex, false);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    setIsErasing(false);
  };

  const handleMouseEnter = (rowIndex, colIndex) => {
    if (isDrawing) {
      setCell(rowIndex, colIndex, true);
    } else if (isErasing) {
      setCell(rowIndex, colIndex, false);
    }
  };

  // Compute the class with the highest probability.
  let bestPredictionClass = null;
  if (prediction && prediction.length > 0) {
    bestPredictionClass = prediction.reduce((max, curr) =>
      curr.raw > max.raw ? curr : max
    ).digit;
  }

  return (
    <div className="canvas-container">
      <div className="grid-prediction-wrapper">
        <div
          className="canvas"
          onMouseLeave={handleMouseUp}
          onMouseUp={handleMouseUp}
          onDragStart={(e) => e.preventDefault()}
          onDrop={(e) => e.preventDefault()}
        >
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((cell, colIndex) => (
                <div
                  key={colIndex}
                  className={`cell ${cell ? "filled" : ""}`}
                  onMouseDown={(e) => handleMouseDown(rowIndex, colIndex, e.button)}
                  onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                  onContextMenu={(e) => e.preventDefault()}
                ></div>
              ))}
            </div>
          ))}
          <button onClick={resetGrid}>Reset Grid</button>
        </div>
  
        {prediction && (
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
                      <div className="vbar-fill" style={{ height: barHeight }}></div>
                    </div>
                    <span className="vbar-label">{mapping[p.digit]}</span>
                  </div>
                );
              })}
            </div>
            <p className="note">The tallest (green) bar is the model's best guess.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Canvas;
