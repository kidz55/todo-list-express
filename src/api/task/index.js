import { Router } from 'express'
import { middleware as query, Schema } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
import { validateTask } from './validators'
import { buildCheckFunction } from 'express-validator'
export Task, { schema } from './model'

const router = new Router()
const { title, description, status, deadLine } = schema.tree

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
  validateTask,
  body({ title, description, status, deadLine }),
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
  query(new Schema({
    sort: 'createdAt'
  })),
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
  buildCheckFunction(['query'])('id').isMongoId(),
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
  validateTask,
  buildCheckFunction(['query'])('id').isMongoId(),
  body({ title, description, status, deadLine }),
  update)

/**
 * @api {delete} /tasks/:id Delete task
 * @apiName DeleteTask
 * @apiGroup Task
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Task not found.
 */
router.delete('/:id',
  buildCheckFunction(['query'])('id').isMongoId(),
  destroy)

export default router
