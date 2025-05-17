export const handleApiError = (error: string | string[] | null) => {
    if (error === null) return null
    if (!error) return ['Ocorreu um erro']
    return Array.isArray(error) ? error : [error]
}

export const APIErrorMap: {[key: string]: string} = {
    INVALID_TOKEN: 'Token inválido',
    'client.cpf must be exactly 11 characters': 'CPF Inválido'
}
