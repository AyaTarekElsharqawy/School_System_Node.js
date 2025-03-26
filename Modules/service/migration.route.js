import express from 'express';
import { migrate } from './migration.controller.js';

const router = express.Router();

router.post('/migrate-exams', migrate);

export default router;