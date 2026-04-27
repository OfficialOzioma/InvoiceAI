import { Router } from 'express';
import { 
  createOrganization, 
  getMyOrganizations, 
  inviteStaff, 
  listStaff 
} from '../controllers/organizationController.js';
import { checkAuth } from '../middleware/auth.js';

const router = Router();

router.use(checkAuth);

router.post('/organizations', createOrganization);
router.get('/organizations', getMyOrganizations);
router.post('/organizations/invite', inviteStaff);
router.get('/organizations/:organizationId/staff', listStaff);

export default router;
