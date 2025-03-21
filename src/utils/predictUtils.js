import * as tf from "@tensorflow/tfjs";

/**
 * Loads a TensorFlow.js model from the provided URL or path.
 *
 * @param {string} modelUrl - The URL or path to the model.json file.
 * @returns {Promise<tf.LayersModel>} A promise that resolves to the loaded model.
 */
export async function loadModel(modelUrl) {
  const model = await tf.loadLayersModel(modelUrl);
  return model;
}

/**
 * Converts a 28x28 boolean grid into a TensorFlow.js tensor with shape [1, 28, 28, 1].
 * False values map to 0 and true values map to 1.
 *
 * @param {boolean[][]} grid - The 28x28 grid state.
 * @returns {tf.Tensor4D} The tensor representation of the grid.
 */
export function convertGridToTensor(grid) {
  // Map booleans to numbers: false -> 0, true -> 1.
  const numericGrid = grid.map((row) => row.map((cell) => (cell ? 1 : 0)));
  // Create a 2D tensor of shape [28, 28].
  const tensor2d = tf.tensor2d(numericGrid, [28, 28]);
  // Reshape to add the channel dimension: [1, 28, 28, 1].
  return tensor2d.reshape([1, 28, 28, 1]);
}

/**
 * Passes the grid state to the model for prediction.
 * Formats the raw prediction values into an array of objects for easier display.
 *
 * @param {boolean[][]} grid - The current grid state.
 * @param {tf.LayersModel} model - The loaded TensorFlow.js model.
 * @returns {Promise<Array<{digit: number, probability: string, raw: number}>>} Formatted predictions.
 */
export async function predictFromGrid(grid, model) {
  const inputTensor = convertGridToTensor(grid);
  const predTensor = model.predict(inputTensor);
  const predictions = await predTensor.data();
  // Clean up tensors.
  inputTensor.dispose();
  predTensor.dispose();

  // Format predictions: each index corresponds to a digit, and probabilities are formatted as percentages.
  const formattedPredictions = Array.from(predictions).map((prob, index) => ({
    digit: index,
    probability: (prob * 100).toFixed(2) + '%',
    raw: prob,
  }));

  return formattedPredictions;
}
