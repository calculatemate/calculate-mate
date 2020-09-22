import { Router } from 'express';
import { checkJwt } from '../middlewares/checkJwt';
import MarksheetController from '../controllers/MarksheetController';

const router = Router();

// Get all marksheet
router.get('/', [checkJwt], MarksheetController.listAll);

// Create a new marksheet
router.post('/', [checkJwt], MarksheetController.newMarksheet);

// Delete one marksheet
router.delete('/:id', [checkJwt], MarksheetController.deleteMarksheetItem);

// Edit one user
router.patch('/:id', [checkJwt], MarksheetController.editMarksheet);

export default router;
