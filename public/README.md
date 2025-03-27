# MNIST Demo

MNIST Demo is an interactive web application built with React and TensorFlow.js that classifies handwritten digits in real time. Draw a number (0–9) directly in your browser, and the app will display the model’s prediction probabilities alongside a confidence score. It’s a hands‑on demonstration of how modern machine learning can be run entirely on the client side, without any backend server.

Under the hood, MNIST Demo loads a pre-trained convolutional neural network (CNN) model converted to TensorFlow.js format. Every time you draw or clear the canvas, the app preprocesses your input into a 28×28 grayscale image, feeds it into the model, and updates the UI with the predicted digit and probability distribution.

This project showcases:

- **Client‑side inference:** Run ML models directly in the browser using TensorFlow.js.
- **Interactive UI:** Draw digits on a responsive canvas, see live predictions, and clear or retry instantly.

## Live Demo

https://SimpleChance.github.io/mnistdemo/

## Run Locally

If you’d like to explore or extend the code, follow these steps:

```bash
# Clone the repository
git clone https://github.com/SimpleChance/mnistdemo.git
cd mnistdemo

# Install dependencies
npm install

# Start the development server
npm start
```

Then open http://localhost:3000 in your browser — the app will hot‑reload as you edit code.
