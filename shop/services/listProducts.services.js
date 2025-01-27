const baseUrl = 'https://673ddc070118dbfe86091490.mockapi.io'

export const qlspServices = {
    getProductList : ()=>{
        return axios({
            method: 'GET',
            url: `${baseUrl}/QLDT`,

        })
    }
}