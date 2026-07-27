import type {
  ApiErrorResponse,
  ApiSuccessResponse,
} from "@/types/api";

export function successResponse<T>(
  requestId: string,
  data: T
): ApiSuccessResponse<T> {
  return {
    success: true,
    requestId,
    timestamp: new Date().toISOString(),
    data,
  };
}

export function errorResponse(
  requestId: string,
  code: string,
  message: string
): ApiErrorResponse {
  return {
    success: false,
    requestId,
    timestamp: new Date().toISOString(),
    error: {
      code,
      message,
    },
  };
}