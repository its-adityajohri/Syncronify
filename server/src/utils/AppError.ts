interface ErrorConstructor {
  captureStackTrace(thisArg: any, constructorOpt?: Function): void;
}

class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
      super(message);

      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith("4") ? "fail" : "err";
      this.isOperational = true;

      // Correctly extend the Error object for use with captureStackTrace
      if (Error.captureStackTrace) {
          Error.captureStackTrace(this, this.constructor);
      }
  }
}

export default AppError;