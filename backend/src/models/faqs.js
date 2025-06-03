/*
Campos:

question
answer
level
isActive

*/


import { Schema, model} from "mongoose";

const faqsSchema = new Schema(
{
    questioon: {
        type: String,
        required: true,
        minLenght: 4,
        trim: true
    },

    answer: {
        type: String,
        required: true,
        minLenght: 4,
        trim: true
    },

    level: {
        type: Number,
        min: 1,
        max: 5,
        trim: true
    },

    isActive: {
        type: Boolean,
        required: true,
        minLenght: 4,
        trim: true
    },
}, {
    timestamps: true,
    strict: false
}
)

export default model("Faqs", faqsSchema)