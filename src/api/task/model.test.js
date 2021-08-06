import { Task } from '.'

let task

beforeEach(async () => {
  task = await Task.create({ title: 'test', description: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = task.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(task.id)
    expect(view.title).toBe(task.title)
    expect(view.description).toBe(task.description)
    expect(view.status).toBe(task.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = task.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(task.id)
    expect(view.title).toBe(task.title)
    expect(view.description).toBe(task.description)
    expect(view.status).toBe(task.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
