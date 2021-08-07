import { success, notFound } from '../../services/response/'
import { Task } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Task.create(body)
    .then((task) => task.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Task.find(query, select, cursor)
    .then((tasks) => tasks.map((task) => task.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) => {
  if (!params.id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400)
    res.send({
      status: 'error',
      message: 'invalid ID'
    }).end()
    return
  }
  return Task.findById(params.id)
    .then(notFound(res))
    .then((task) => task ? task.view() : null)
    .then(success(res))
    .catch(next)
}

export const update = ({ bodymen: { body }, params }, res, next) => {
  // if (!params.id.match(/^[0-9a-fA-F]{24}$/)) {
  //   res.status(400)
  //   res.send({
  //     status: 'error',
  //     message: 'invalid ID'
  //   }).end()
  //   return
  // }
  return Task.findById(params.id)
    .then(notFound(res))
    .then((task) => task ? Object.assign(task, body).save() : null)
    .then((task) => task ? task.view(true) : null)
    .then(success(res))
    .catch(next)
}

export const destroy = ({ params }, res, next) => {
  if (!params.id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400)
    res.send({
      status: 'error',
      message: 'invalid ID'
    }).end()
    return
  }
  return Task.findById(params.id)
    .then(notFound(res))
    .then((task) => task ? task.remove() : null)
    .then(success(res, 204))
    .catch(next)
}
