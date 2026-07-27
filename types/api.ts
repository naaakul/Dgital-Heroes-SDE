export interface ApiSuccessResponse<T> {
  success: true;
  requestId: string;
  timestamp: string;
  data: T;
}

export interface ApiError {
  code: string;
  message: string;
}

export interface ApiErrorResponse {
  success: false;
  requestId: string;
  timestamp: string;
  error: ApiError;
}