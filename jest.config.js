module.exports = {
  transform: {
    '^.+\\.svelte$': 'svelte-jester',
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'ts', 'svelte'],
};
