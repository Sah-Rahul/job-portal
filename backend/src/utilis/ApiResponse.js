export class ApiResponse {
  constructor(statusCode = 200, data = null, message = "Success") {
    this.statusCode = statusCode;
    this.success = true;
    this.message = message;

    if (data !== null && data !== undefined) {
      this.data = data;
    }
  }
}
