import { Router } from "express";
import * as mealsController from '../controllers/meals.js'

const router = Router();

// GET -- localhost:3000/meals/
router.get('/new', mealsController.new);

// GET -- localhost:3000/meals/create
router.post('/', mealsController.create);


export {
  router
}