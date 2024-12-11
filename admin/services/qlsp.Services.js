const baseUrl = 'https://673ddc070118dbfe86091490.mockapi.io'

export const qlspServices = {
    getProductList : ()=>{
        return axios({
            method: 'GET',
            url: `${baseUrl}/QLDT`,

        })
    },

    deleteProduct: (productId)=>{
        return axios({
            method: 'DELETE',
            url: `${baseUrl}/QLDT/${productId}`

        })
    },

    addProduct:(payLoad)=>{
        return axios ({
            method:'POST',
            url: `${baseUrl}/QLDT`,
            data: payLoad
        })
    },

    getProductById:(productId)=>{
        return axios({
            method: 'GET',
            url: `${baseUrl}/QLDT/${productId}`

        })
    },
    editProduct:(productId, payLoad)=>{
        return axios({
            method: 'PUT',
            url: `${baseUrl}/QLDT/${productId}`,
            data: payLoad
        })
    }
}