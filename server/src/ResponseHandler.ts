interface SuccessResponseProps {
  message: string;
}

interface ErrorResponseProps {
  message: string;
  error: string;
}

export class ResponseHandler {
  success(msg: string): SuccessResponseProps {
    return {
      message: msg,
    };
  }

  error(msg: string, err: string): ErrorResponseProps {
    return {
      message: msg,
      error: err,
    };
  }
}
