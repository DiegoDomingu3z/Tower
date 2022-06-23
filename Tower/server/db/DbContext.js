import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { TicketSchema } from '../models/Ticket';
import { TowerSchema } from '../models/Tower';
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Tower = mongoose.model('Tower', TowerSchema)

  Ticket = mongoose.model('Ticket', TicketSchema)
}

export const dbContext = new DbContext()
