// gridStateManager.jsx
import { useState, useCallback } from "react";

/** Custom hook for managing a 28x28 grid.
 *
 * @returns {Object} An object containing the grid state, a setter for a cell, and a reset function.
 * @property {boolean[][]} grid - The current grid state.
 * @property {Function} setCell - Function to update a specific cell in the grid.
 * @property {Function} resetGrid - Function to reset the grid to its initial state.
 */
export default function useGrid() {
	// Create an initial 28x28 grid with all cells set to false.
	const getInitialGrid = () => Array.from({ length: 28 }, () => Array(28).fill(false));
	const [grid, setGrid] = useState(getInitialGrid());

	/** Updates a cell at the given row and column index.
	 *
	 * @param {number} rowIndex - The row index.
	 * @param {number} colIndex - The column index.
	 * @param {boolean} fill - The new state for the cell.
	 */
	const setCell = useCallback((rowIndex, colIndex, fill) => {
		setGrid((prevGrid) =>
			prevGrid.map((row, rIdx) =>
				row.map((cell, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? fill : cell))
			)
		);
	}, []);

	/** Resets the grid to its initial state.*/
	const resetGrid = useCallback(() => {
		setGrid(getInitialGrid());
	}, []);

	return { grid, setCell, resetGrid };
}
