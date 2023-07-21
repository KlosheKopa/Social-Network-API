const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: "Thought is Required",
        minlength: 1,
        maxlength: 280,
        trim: true,
      },
  
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
  
      username: {
        type: String,
        required: true,
      },
  
      // array of nested documents created with the reactionSchema
      reactions: [
        {
            reactionId: {
                type: Schema.Types.ObjectId,
                default: () => new Types.ObjectId(),
            },
          
            reactionBody: {
                type: String,
                required: true,
                maxlength: 280,
            },
        
            username: {
                type: String,
                required: true,
            },
        
            createdAt: {
                type: Date,
                default: Date.now,
                get: (timestamp) => dateFormat(timestamp),
            },
        },
      ],
    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;