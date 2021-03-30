module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper:{
    "@presentation/(.*)": "<rootDir>/src/presentation/$1"
  }
};