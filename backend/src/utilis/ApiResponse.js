export class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.message = message;
    this.success = true;

    if (data !== null && data !== undefined) {
      this.data = data;
    }
  }
}
