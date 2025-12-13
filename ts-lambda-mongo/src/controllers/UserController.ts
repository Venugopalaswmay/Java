import { Request, Response } from 'express';
import User from '../models/User';
import { connectDatabase } from '../database';

export class UserController {
    // Similar to @PostMapping
    static async createUser(req: Request, res: Response) {
        try {
            await connectDatabase();
            const user = new User(req.body);
            const savedUser = await user.save();
            res.status(201).json(savedUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Could not create user' });
        }
    }

    // Similar to @GetMapping
    static async getUsers(req: Request, res: Response) {
        try {
            await connectDatabase();
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Could not fetch users' });
        }
    }
}
