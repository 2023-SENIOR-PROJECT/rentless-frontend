export declare type ApiError = {
  message: string;
  response: {
    data: {
      message: string;
    };
  };
};

export interface SuccessResponse<T> {
  data: T;
  message: string;
}

export type TResponse<T> = SuccessResponse<T> | ApiError;
