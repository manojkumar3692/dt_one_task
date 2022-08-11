import axios from "axios";
import config from './config'
const key = '6d0480d5-2132-56bb-9f04-fec613de2ac4'
const secret = 'fa838754-c2e0-5118-85ba-be8b835b0774'
// const encodedToken = Buffer.from(token).toString('base64');
// const token = Buffer.from(`${key}:${secret}`, 'utf8').toString('base64')

const options = {
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        // 'Authorization': `Basic ${token}`
    },
    auth: {
        username: key,
        password: secret
    },
}

const api = axios.create({
    ...options
});

// LISTING PRODUCT API

export const productList = (params) => {
    console.log('API', params)
    // return api.get(`/v1/products?&type=${params.type}&benefit_types=${params.benefit_types}&region=${params.region}`)
    return api.get(`/v1/products?${params}`)

}


export default api;