const Event = require('../models/Event');

// 1) Show all events
exports.listEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      order: [['date','ASC'], ['time','ASC']]
    });
    res.render('events/list', { events });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

// 2) Render “Add Event” form
exports.showAddForm = (req, res) => {
  res.render('events/form', { event: {} });
};

// 3) Handle Add Event form submit
exports.createEvent = async (req, res) => {
  try {
    await Event.create(req.body);
    res.redirect('/events');
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

// 4) Render “Edit Event” form
exports.showEditForm = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.sendStatus(404);
    res.render('events/form', { event });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

// 5) Handle Edit Event form submit
exports.updateEvent = async (req, res) => {
  try {
    await Event.update(req.body, { where: { id: req.params.id } });
    res.redirect('/events');
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

// 6) Delete an event
exports.deleteEvent = async (req, res) => {
  try {
    await Event.destroy({ where: { id: req.params.id } });
    res.redirect('/events');
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
