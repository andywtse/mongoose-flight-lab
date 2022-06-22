import { Router } from "express";
import * as flightController from '../controllers/flights.js'

const router = Router();

// GET -- localhost:3000/flights/
router.get('/', flightController.index);

// GET -- localhost:3000/flights/new
router.get('/new', flightController.new);

// GET -- localhost:3000/flights/:id
router.get('/:id', flightController.show);

// GET -- localhost:3000/flights/:id/edit
router.get('/:id/edit', flightController.edit);

// POST -- localhost:3000/flights/
router.post('/', flightController.create);

// GET -- localhost:3000/flights/:id/tickets
router.post('/:id/tickets', flightController.createTicket);

// POST localhost:3000/movies/:id/performers
router.post('/:id/meals', flightController.addToMeals)

// PUT -- localhost:3000/flights/:id
router.put('/:id', flightController.update);

// DELETE -- localhost:3000/flights/
router.delete('/:id', flightController.delete);

// DELETE -- localhost:3000/flights/:id/tickets
router.delete('/:id/tickets/:ticketId', flightController.deleteTicket);

export {
  router
}