export const handleApiError = (error: string | string[] | null) => {
    if (!error) return ['Ocorreu um erro']
    return Array.isArray(error) ? error : [error]
}

export const APIErrorMap = {
    INVALID_TOKEN: 'Token inválido'
}
