import express from 'express';
import { UserController } from './controllers/UserController';

const app = express();

app.use(express.json());

// Routes
app.post('/users', UserController.createUser);
app.get('/users', UserController.getUsers);

export default app;
