import { Router } from 'express';
import { getHome, getAbout, getContact, getPrivacy } from '../controllers/homeController.js';

const router = Router();

router.get('/', getHome);
router.get('/about', getAbout);
router.get('/contact', getContact);
router.get('/privacy', getPrivacy);

export default router;
