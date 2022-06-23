import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { CommentSchema } from '../models/Comment';
import { TicketSchema } from '../models/Ticket';
import { TowerSchema } from '../models/Tower';
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Tower = mongoose.model('Tower', TowerSchema)

  Ticket = mongoose.model('Ticket', TicketSchema)

  Comment = mongoose.model('Comment', CommentSchema)
}

export const dbContext = new DbContext()
