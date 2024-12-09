import { Schema, model, models } from 'mongoose';

const SessionSchema = new Schema({
  name: {
    type: String, 
    required: true, 
    default: "New Session"
  },
  solves: [
    {
      solveTime: { type: Number, required: true },  
      scramble: { type: String, required: true },   
      date: { type: String, required: true }        
    }
  ]
}, { timestamps: true });  

const Session = models.Session || model('Session', SessionSchema);

export default Session;
