import { SimpleReservoir } from './simple-reservoir.js';

// Create a small reservoir
const reservoir = new SimpleReservoir(5);

// Test with simple inputs
console.log('Initial state:', reservoir.getState());

// Process some inputs
const inputs = [0.1, 0.5, -0.3, 0.8];
console.log('\nProcessing inputs:', inputs);

inputs.forEach((input, i) => {
  const state = reservoir.process(input);
  console.log(`\nAfter input ${i + 1} (${input}):`);
  console.log('Reservoir state:', state);
});