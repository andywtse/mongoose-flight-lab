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

// PUT -- localhost:3000/flights/:id
router.put('/:id', flightController.update);

// DELETE -- localhost:3000/flights/
router.delete('/:id', flightController.delete);

export {
  router
}