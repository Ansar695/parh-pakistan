export class AppError extends Error {
    statusCode: number
  
    constructor(message: string, statusCode: number) {
      super(message)
      this.statusCode = statusCode
    }
  }
  
  export const handleError = (error: any) => {
    if (error instanceof AppError) {
      return { message: error.message, statusCode: error.statusCode }
    }
    console.error(error)
    return { message: "Internal Server Error", statusCode: 500 }
  }
  
  