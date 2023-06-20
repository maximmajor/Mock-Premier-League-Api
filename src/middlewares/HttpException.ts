export class HttpException extends Error {
    message: string;
    statusCode: number;
  
    constructor(statusCode: number, message: string) {
      super(message);
      this.statusCode = statusCode;
      this.message = message;
    }
  }