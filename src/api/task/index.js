import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Task, { schema } from './model'

const router = new Router()
const { title, description, status } = schema.tree

/**
 * @api {post} /tasks Create task
 * @apiName CreateTask
 * @apiGroup Task
 * @apiParam title Task's title.
 * @apiParam description Task's description.
 * @apiParam status Task's status.
 * @apiSuccess {Object} task Task's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Task not found.
 */
router.post('/',
  body({ title, description, status }),
  create)

/**
 * @api {get} /tasks Retrieve tasks
 * @apiName RetrieveTasks
 * @apiGroup Task
 * @apiUse listParams
 * @apiSuccess {Object[]} tasks List of tasks.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /tasks/:id Retrieve task
 * @apiName RetrieveTask
 * @apiGroup Task
 * @apiSuccess {Object} task Task's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Task not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /tasks/:id Update task
 * @apiName UpdateTask
 * @apiGroup Task
 * @apiParam title Task's title.
 * @apiParam description Task's description.
 * @apiParam status Task's status.
 * @apiSuccess {Object} task Task's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Task not found.
 */
router.put('/:id',
  body({ title, description, status }),
  update)

/**
 * @api {delete} /tasks/:id Delete task
 * @apiName DeleteTask
 * @apiGroup Task
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Task not found.
 */
router.delete('/:id',
  destroy)

export default router
