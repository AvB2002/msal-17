export const environment = {
    production: true,
    msalConfig: {
        auth: {
            clientId: '596248ce-82d5-46b4-b629-57f61df676b3',
            authority: 'https://login.microsoftonline.com/60a56aa9-abb9-4562-a804-e5a472612b07'
        }
    },
    apiConfig: {
        scopes: [
            "api://bf8d4b81-6b6a-4810-977b-75c2ac443dcb/MSGraphApi.Read",
            "api://bf8d4b81-6b6a-4810-977b-75c2ac443dcb/MSGraphApi.ReadWrite"
        ],
        uri: 'https://localhost:44351/api'
    }
  };

  