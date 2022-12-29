interface ResponseDto {
    result: 'SUCCESS' | 'FAILED'
    data: any | null
    message: string | null
}
