import { authPlugins } from 'mysql2';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de ConnectHub(Backend)',
            version: '1.0.0',
            description: 'Documentación de la API para ConnectHub Backend',
        },

        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de desarrollo'
            },
        ]
    },

    apis: ['.routes/*.js', './controllers/*.js'],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);