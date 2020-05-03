export default class AppError extends Error {
  constructor(message, severity = '') {
    super(message);

    this.severity = severity;
  }
}