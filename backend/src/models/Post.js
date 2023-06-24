import { mongoose } from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    text: {
        type: String,
        required: true
    },
    labels: [
        {
            label: {
                type: String,
            }
        }
    ],
    upvotes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "user"
            }
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "user"
            },
            text: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model("Post", postSchema);
export default Post;