import { Flight } from '../models/model.js'

function index(req, res) {
  Flight.find({})
    .then(flights => {
      res.render('flights/index', {
        title: 'All Flights',
        flights
      });
    })
    .catch(error => {
      console.log(error);
      res.redirect('/');
    });
}

function newFlight(req, res) {
  res.render('flights/new', {
    title: "Add Flight"
  });
}

function show(req, res) {
  Flight.findById(req.params.id)
    .then(flight => {
      res.render('flights/show', {
        title: 'Flight Detail',
        flight
      });
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
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(error => {
      console.log(error);
      res.redirect('/flights/new')
    });
}

function update(req, res) {

  for (let key in req.body) {
    if(req.body[key] === "") delete req.body[key]
  }

  Flight.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(flight => {
      res.redirect(`/flights/${flight._id}`);
    })
    .catch(error => {
      console.log(error);
      res.redirect('/')
    });
}

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id)
  .then(flight => {
    res.redirect('/');
  })
  .catch(error => {
    console.log(error);
    res.redirect('/')
  });
}

export {
  index,
  edit,
  show,
  update,
  create,
  newFlight as new,
  deleteFlight as delete
}