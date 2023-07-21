const router = require('express').Router();

const {
	getAllThoughts,
	getThoughtById,
	createThought,
	updateThought,
	deleteThought,
	addReaction,
	deleteReaction,
} = require('../../controllers/thought-controller')

router
	.route('/')
	.get(getAllThoughts)
	.post(createThought)

router
	.route('/:thoughtId')
	.get(getThoughtById)
	.put(updateThought)
	.delete(deleteThought)
	.post(addReaction);

router
	.route("/:thoughtId/reaction/:reactionId")
	.delete(deleteReaction);


module.exports = router;