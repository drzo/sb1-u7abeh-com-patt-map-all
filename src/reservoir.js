import { Matrix } from './matrix.js';

export class ReservoirNode {
  constructor(units = 100, inputScaling = 1.0, spectralRadius = 0.99) {
    this.units = units;
    this.inputScaling = inputScaling;
    this.spectralRadius = spectralRadius;
    this.initialized = false;
  }

  initialize(inputDim) {
    // Initialize input weights
    this.Win = Matrix.random(this.units, inputDim);
    for (let i = 0; i < this.Win.rows; i++) {
      for (let j = 0; j < this.Win.cols; j++) {
        this.Win.data[i][j] *= this.inputScaling;
      }
    }

    // Initialize reservoir weights
    this.W = Matrix.random(this.units, this.units);
    // Simple spectral radius scaling approximation
    for (let i = 0; i < this.W.rows; i++) {
      for (let j = 0; j < this.W.cols; j++) {
        this.W.data[i][j] *= this.spectralRadius / this.units;
      }
    }

    // Initialize state
    this.state = new Matrix(1, this.units);
    this.initialized = true;
  }

  forward(input) {
    if (!this.initialized) {
      this.initialize(input.cols);
    }

    // Update reservoir state
    const inputProjection = input.multiply(this.Win.transpose());
    const recurrentProjection = this.state.multiply(this.W);
    const combined = inputProjection.add(recurrentProjection);
    
    // Apply tanh activation
    this.state = combined.map(x => Math.tanh(x));
    return this.state;
  }

  getState() {
    return this.state;
  }

  reset() {
    if (this.initialized) {
      this.state = new Matrix(1, this.units);
    }
  }
}