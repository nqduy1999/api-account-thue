/* eslint-disable import/order */
const RequirePapersController = require('../controllers/require-paper.controller');
// const auth = require('../middleware/auth');

const router = require('express').Router();

router.get('/', RequirePapersController.getRequirePaper);
router.post('/', RequirePapersController.createRequirePaper);

router.delete('/:id', RequirePapersController.deleteRequirePaper);
router.put('/:id', RequirePapersController.updateRequirePaper);
module.exports = router;
