import mongoose, { Schema } from 'mongoose'

const taskSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  status: {
    type: String
  },
  deadLine: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

taskSchema.methods = {
  view () {
    const view = {
      // simple view
      id: this.id,
      title: this.title,
      description: this.description,
      status: this.status,
      deadLine: this.deadLine,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return view
  }
}

const model = mongoose.model('Task', taskSchema)

export const schema = model.schema
export default model
