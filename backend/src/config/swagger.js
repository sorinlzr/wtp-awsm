import dotenv from 'dotenv';
dotenv.config({ path: '../.env' })

import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const setupSwagger = (app) => {
    const options = {
      swaggerDefinition: {
        openapi: '3.0.0',
        info: {
          title: 'MindShare API',
          version: '1.0.0',
          description: 'API documentation using Swagger',
        },
        servers: [
          {
            url: `http://localhost:${process.env.APP_BACKEND_PORT}`,
          },
        ],
      },
      apis: ['./src/routes/*.js'],
    };
  
    const specs = swaggerJsDoc(options);
  
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  };

  export default setupSwagger;