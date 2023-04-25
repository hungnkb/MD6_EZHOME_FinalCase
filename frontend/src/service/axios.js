import axios from "axios"

export const axiosCuston = (method, url, data, token) => {
    axios({
        method,
        url,
        data: data || {},
        headers: {
            Authorization: JSON.parse(token),
        }
    })
}