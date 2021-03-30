module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper:{
    "@controller/(.*)": "<rootDir>/src/presentation/controllers/$1"
  }
};