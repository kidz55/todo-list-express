# todo-list-backend v0.0.0



- [Task](#task)
	- [Create task](#create-task)
	- [Delete task](#delete-task)
	- [Retrieve task](#retrieve-task)
	- [Retrieve tasks](#retrieve-tasks)
	- [Update task](#update-task)
	


# Task

## Create task



	POST /tasks


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| title			| 			|  <p>Task's title.</p>							|
| description			| 			|  <p>Task's description.</p>							|
| status			| 			|  <p>Task's status.</p>							|

## Delete task



	DELETE /tasks/:id


## Retrieve task



	GET /tasks/:id


## Retrieve tasks



	GET /tasks


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update task



	PUT /tasks/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| title			| 			|  <p>Task's title.</p>							|
| description			| 			|  <p>Task's description.</p>							|
| status			| 			|  <p>Task's status.</p>							|


