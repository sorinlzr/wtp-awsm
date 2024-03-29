import { mongoose } from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    text: {
        type: String,
        required: true
    },
    textLanguage: {
        type: String,
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
                ref: "User"
            }
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "User"
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