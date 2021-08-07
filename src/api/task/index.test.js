import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Task } from '.'

const app = () => express(apiRoot, routes)

let task

beforeEach(async () => {
  task = await Task.create({
    title: 'my task test',
    description: 'desc',
    status: 'incomplete'
  })
})

test('POST /tasks 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ title: 'test', description: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.status).toEqual('test')
})

test('GET /tasks 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /tasks/:id 200', async () => {
  console.log(`${apiRoot}/${task.id}`)
  const { status, body } = await request(app())
    .get(`${apiRoot}/${task.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(task.id)
})

test('GET /tasks/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /tasks/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${task.id}`)
    .send({ title: 'test', description: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(task.id)
  expect(body.title).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.status).toEqual('test')
})

test('PUT /tasks/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ title: 'test', description: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /tasks/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${task.id}`)
  expect(status).toBe(204)
})

test('DELETE /tasks/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
