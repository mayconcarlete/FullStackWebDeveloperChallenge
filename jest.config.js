module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper:{
    "@presentation/(.*)": "<rootDir>/src/presentation/$1",
    "@domain/(.*)":"<rootDir>/src/domain/$1",
    "@main/(.*)":"<rootDir>/src/main/$1",
    "@infra/(.*)": "<rootDir>/src/infra/$1"
  }
};