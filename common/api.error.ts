class ApiError extends Error {
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }

  statusCode: number;
}

export default ApiError;