import { Api, EndpointDeclaration } from "./api";
import { API_BASE_URL } from '../../../environment'

const endpoints: EndpointDeclaration[] = [
    {
        name: 'authenticate',
        method: 'post',
        url: 'institutions/login'
    },
    {
        name: 'login',
        method: 'post',
        url: 'users/login'
    },
    {
        name: 'verifyExistence',
        method: 'post',
        url: 'users/verifyExistence'
    },
    {
        name: 'createUser',
        method: 'post',
        url: 'users'
    }
]

export const castApi = new Api({
    baseUrl: API_BASE_URL as string,
    endpoints: endpoints
})
