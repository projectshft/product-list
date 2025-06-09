import express, { json, urlencoded } from 'express';
import { RegisterRoutes } from '../build/routes';
import { connect } from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../build/swagger.json';
import { errorHandler, notFoundHandler } from './errors/errorHandlers';
import { configDotenv } from 'dotenv';

configDotenv();

export const app = express();

const mongoConnectionString =
  process.env.MONGO_URI ||
  process.env.MONGODB ||
  'mongodb://localhost/products';

const mongoDb = connect(mongoConnectionString);
if (!mongoDb) {
  console.warn('[app.ts] MONGODB connection error');
  process.exit(1);
}

// CORS
app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(
  urlencoded({
    extended: true,
  })
);
app.use(json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Import API routes, mount all under /api
RegisterRoutes(app);

// Handle route not found
app.use(notFoundHandler);

// Handle errors
app.use(errorHandler);
