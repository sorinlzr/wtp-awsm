import { mongoose } from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema({
    text: {
        type: String,
        required: true
    },
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