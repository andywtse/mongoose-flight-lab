import { Flight } from '../models/model.js'
import { Meal } from '../models/meal.js'

function index(req, res) {
  Flight.find({}).sort('departs')
    .then(flights => {
      res.render('flights/index', {
        title: 'All Flights',
        lateFlight: 'late-flight',
        currentDate: new Date(Date.now()),
        flights
      });
    })
    .catch(error => {
      console.log(error);
      res.redirect('/');
    });
}

function newFlight(req, res) {

  const newFlight = new Flight();

  const dateTime = newFlight.departs;
  const departsDate = dateTime.toISOString().slice(0, 10);

  res.render('flights/new', {
    title: "Add Flight",
    departsDate
  });
}

function show(req, res) {
  Flight.findById(req.params.id)
    .populate('meals')
    .then(flight => {
      Meal.find({ _id: { $nin: flight.meals } })
        .then(meals => {
          res.render('flights/show', {
            title: 'Flight Detail',
            flight,
            meals
          });
        })

    })
    .catch(error => {
      console.log(error);
      res.redirect('/');
    });
}

function edit(req, res) {
  Flight.findById(req.params.id)
    .then(flight => {
      res.render('flights/edit', {
        title: 'Edit Flight',
        flight
      });
    })
    .catch(error => {
      console.log(error);
      res.redirect('/');
    });
}

function create(req, res) {

  for (let key in req.body) {
    if (req.body[key] === '') {
      delete req.body[key];
    }
  }

  Flight.create(req.body)
    .then(flight => {
      res.redirect(`/flights`)
    })
    .catch(error => {
      console.log(error);
      res.redirect('/flights/new')
    });
}

function createTicket(req, res) {
  Flight.findById(req.params.id)
    .then(flight => {
      flight.tickets.push(req.body);
      flight.save()
        .then(() => {
          res.redirect(`/flights/${flight._id}`);
        });
    })
    .catch(error => {
      console.log(error);
      res.redirect('/');
    });
}

function addToMeals(req, res) {
  Flight.findById(req.params.id)
    .then(flight => {
      flight.meals.push(req.body.mealsId);
      flight.save()
        .then(() => {
          res.redirect(`/flights/${flight._id}`);
        })
    })
    .catch(error => {
      console.log(error);
      res.redirect('/');
    });
}

function update(req, res) {

  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key]
  }

  Flight.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(flight => {
      res.redirect(`/flights/${flight._id}`);
    })
    .catch(error => {
      console.log(error);
      res.redirect('/');
    });
}

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id)
    .then(flight => {
      res.redirect('/flights');
    })
    .catch(error => {
      console.log(error);
      res.redirect('/');
    });
}

function deleteTicket(req, res) {
  Flight.findById(req.params.id)
    .then(flight => {
      flight.tickets.remove({ _id: req.params.ticketId });
      flight.save()
        .then(() => {
          res.redirect(`/flights/${flight._id}`);
        });
    })
    .catch(error => {
      console.log(error);
      res.redirect('/');
    });
}

function deleteMeal(req, res) {
  Flight.findById(req.params.id)
    .then(flight => {
      flight.meals.remove({ _id: req.params.mealId });
      flight.save()
        .then(() => {
          res.redirect(`/flights/${flight._id}`);
        })
    })
    .catch(error => {
      console.log(error);
      res.redirect('/');
    });
}

export {
  index,
  edit,
  show,
  update,
  create,
  createTicket,
  newFlight as new,
  deleteFlight as delete,
  deleteTicket,
  addToMeals,
  deleteMeal
}