import axios from "axios";

const baseUrl = "https://core.ezvpn.co/tlgBot/"

const headers = (token: string) => { return { headers: { Authorization: token } } }
const defaultConfig = () => { return { timeout: 120000 } }

export const POST = (withToken = true, config = {}) => async (url = '', data = {}) => {
    if (!config) config = {}
    config = { ...defaultConfig(), ...config }
    // if (withToken) config = { ...headers(), ...config, }
    return await axios.post(`${baseUrl}${url}`, data, config).catch((error) => { throw error.response })
}

export const GET = (withToken = true, config = {}) => async (url = '') => {
    if (!config) config = {}
    config = { ...defaultConfig(), ...config }
    // if (withToken) config = { ...headers(), ...config, }
    return await axios.get(`${baseUrl}${url}`, config).catch((error) => { throw error.response })
}

export const PUT = (withToken = true, config = {}) => async (url = '', data = {}) => {
    if (!config) config = {}
    config = { ...defaultConfig(), ...config }
    // if (withToken) config = { ...headers(), ...config, }
    return await axios.put(`${baseUrl}${url}`, data, config).catch((error) => { throw error.response })
}

export const PATCH = (withToken = true, config = {}) => async (url = '', data = {}) => {
    if (!config) config = {}
    config = { ...defaultConfig(), ...config }
    // if (withToken) config = { ...headers(), ...config, }
    return await axios.patch(`${baseUrl}${url}`, data, config).catch((error) => { throw error.response })
}

export const DELETE = (withToken = true, config = {}) => async (url = '') => {
    if (!config) config = {}
    config = { ...defaultConfig(), ...config }
    // if (withToken) config = { ...headers(), ...config, }
    return await axios.delete(`${baseUrl}${url}`, config).catch((error) => { throw error.response })
}


