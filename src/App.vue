<template>
  <v-app>
    <v-container class="mt-1">
      <v-row>
        <v-col cols="12">
          <h1 class="text-center">Random Walker</h1>
        </v-col>
      </v-row>
      <v-row>
        <!-- Input Form -->
        <v-col cols="12" md="6">
          <v-text-field v-model.number="start" label="Start Value" type="number" />
          <v-text-field v-model.number="steps" label="Number of Steps" type="number" />
          <v-text-field v-model.number="maxStep" label="Max Step Magnitude" type="number" />
          <v-text-field v-model.number="lowerBound" label="Lower Bound" type="number" />
          <v-text-field v-model.number="upperBound" label="Upper Bound" type="number" />
          <v-btn color="primary" @click="generate">Generate</v-btn>
        </v-col>
        <!-- Display and Copy -->
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>
              Sequence
              <v-spacer></v-spacer>
              <v-btn icon @click="copySequence">
                <v-icon>mdi-content-copy</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <div style="font-family: monospace; white-space: pre-wrap;">
                {{ sequence.join(' ') }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

// Define reactive variables for inputs and the resulting sequence
const start = ref(6)
const steps = ref(16)
const maxStep = ref(3)
const lowerBound = ref(0)
const upperBound = ref(12)
const sequence = ref([])

// Function to return a random nonzero integer between -maxStep and maxStep (inclusive)
function randomNonZeroStep(maxStepVal) {
  let step = 0
  while (step === 0) {
    step = Math.floor(Math.random() * (2 * maxStepVal + 1)) - maxStepVal
  }
  return step
}

// Generates the random walk with bounce behavior at the bounds
function generate() {
  sequence.value = []
  let current = start.value
  sequence.value.push(current)
  for (let i = 1; i < steps.value; i++) {
    const step = randomNonZeroStep(maxStep.value)
    let next = current + step
    if (next > upperBound.value) {
      const excess = next - upperBound.value
      next = upperBound.value - excess
    } else if (next < lowerBound.value) {
      const deficit = lowerBound.value - next
      next = lowerBound.value + deficit
    }
    sequence.value.push(next)
    current = next
  }
}

// Copies the space-separated sequence to clipboard
function copySequence() {
  const textToCopy = sequence.value.join(' ')
  navigator.clipboard.writeText(textToCopy)
    .then(() => alert('Sequence copied!'))
    .catch(err => console.error('Copy failed:', err))
}
</script>

<style>
body {
  background: #000;
  color: #0f0; /* Optional: makes text readable */
}
</style>