// jest.config.js
const { createDefaultPreset } = require('ts-jest')

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  transform: {
    ...createDefaultPreset().transform,
  },
}