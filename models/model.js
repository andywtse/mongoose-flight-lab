import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  seat: {
    type: String,
    match: /[A-F][1-9]\d?/
  },
  price: {
    type: Number,
    min: 0
  }
}, {
  timestamps: true
});

const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United', 'Delta', 'JetBlue']
  },
  airport: {
    type: String,
    default: 'DEN',
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999
  },
  departs: {
    type: Date,
    default: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16)
  },
  meals: [{type: Schema.Types.ObjectId, ref: 'Meal'}],
  tickets: [ticketSchema]
}, {
  timestamps: true
});

const Flight = mongoose.model('Flight', flightSchema);

export {
  Flight
}