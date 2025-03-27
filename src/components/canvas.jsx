// Canvas.jsx
import React, { useState } from "react";
import "../styles/Canvas.css";

/** Canvas component for drawing on a 28x28 grid and making predictions.
 *
 * @component
 * @param {boolean[][]} grid - The grid state to draw on.
 * @param {Function} setCell - Function to update a specific cell in the grid.
 * @param {Function} resetGrid - Function to reset the grid to its initial state.
 * @returns {JSX.Element} The canvas component.
 */
const Canvas = ({ grid, setCell, resetGrid }) => {
	// States for drawing and erasing.
	const [isDrawing, setIsDrawing] = useState(false);
	const [isErasing, setIsErasing] = useState(false);

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

	return (
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
	);
};

export default Canvas;
