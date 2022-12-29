interface SuccessResponseDto {
    status: 200
    data: any
}

interface ErrorResponseDto {
    status: number
    message: string
    timestamp: string
    path: string
}
