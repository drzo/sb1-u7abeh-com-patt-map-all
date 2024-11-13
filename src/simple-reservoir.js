export class SimpleReservoir {
  constructor(size = 100, inputScaling = 0.5, spectralRadius = 0.9) {
    this.size = size;
    this.inputScaling = inputScaling;
    this.spectralRadius = spectralRadius;
    this.state = new Float32Array(size);
    this.weights = this.initializeWeights();
  }

  initializeWeights() {
    // Initialize reservoir weights with spectral radius scaling
    const weights = new Float32Array(this.size * this.size);
    for (let i = 0; i < weights.length; i++) {
      weights[i] = (Math.random() * 2 - 1) * this.spectralRadius;
    }
    return weights;
  }

  update(input) {
    // Update reservoir state
    const newState = new Float32Array(this.size);
    
    for (let i = 0; i < this.size; i++) {
      let sum = 0;
      // Input contribution
      sum += input * this.inputScaling;
      
      // Reservoir connections
      for (let j = 0; j < this.size; j++) {
        sum += this.state[j] * this.weights[i * this.size + j];
      }
      
      // Apply tanh activation
      newState[i] = Math.tanh(sum);
    }
    
    this.state = newState;
    return this.state;
  }

  getState() {
    return this.state;
  }

  reset() {
    this.state = new Float32Array(this.size);
  }
}