const router = require('express').Router();
const ctrl   = require('../controllers/eventController');

// READ: list
router.get('/', ctrl.listEvents);

// CREATE: show form & submit
router.get('/new', ctrl.showAddForm);
router.post('/new', ctrl.createEvent);

// UPDATE: show form & submit
router.get('/:id/edit', ctrl.showEditForm);
router.post('/:id/edit', ctrl.updateEvent);

// DELETE
router.post('/:id/delete', ctrl.deleteEvent);

module.exports = router;
