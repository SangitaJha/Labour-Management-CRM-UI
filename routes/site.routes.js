const express = require('express');
const router = express.Router();
const siteController = require('../controllers/site.controller');

// Optional: Add auth middleware if available
// const { protect } = require('../middleware/auth');
// router.use(protect);

router.get('/', siteController.getSites);
router.get('/:id', siteController.getSite);
router.post('/', siteController.createSite);
router.put('/:id', siteController.updateSite);
router.delete('/:id', siteController.deleteSite);

module.exports = router;
