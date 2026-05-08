import { Router } from 'express';
import * as dealController from '../controllers/dealController.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = Router();

router.use(authMiddleware);

router.get('/', dealController.getAllDeals);
router.get('/:id', dealController.getDealById);
router.post('/', dealController.createDeal);
router.put('/:id', dealController.updateDeal);
router.delete('/:id', dealController.deleteDeal);

export default router;