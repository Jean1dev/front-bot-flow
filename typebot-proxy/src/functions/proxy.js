const { app } = require('@azure/functions');
const axios = require('axios')

app.http('proxy', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const body = await request.json();
        const { method, api } = body

        let config = {
            method,
            url: api,
            headers: {
                'Content-Type': '*/*',
                'Authorization': request.headers.get('Authorization')
            }
        };

        return axios.request(config)
            .then((response) => {
                return { jsonBody: response.data }
            })
            .catch((error) => {
                return { 
                    status: 400,
                    jsonBody: error.response.data
                 }
            });
    }
});
