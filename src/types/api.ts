export interface ApiValidationError {
  loc: (string | number)[]
  msg: string
  type: string
}

export interface ApiErrorResponse {
  detail?: string | ApiValidationError[] | { message?: string }
}

export interface AppError extends Error {
  status?: number
  retryAfter?: number
}
