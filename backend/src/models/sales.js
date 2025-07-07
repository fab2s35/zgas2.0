/*
    Colección: Sales

    Campos:
        Product
        Category
        Customer
        Total
*/

import { Schema, model } from "mongoose";

const salesSchema = new Schema(
  {
    product: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    customer: {
      type: String,
      requierd: true
    },
    total: {
        type: Number,
        required: true
    }
  },
  {
    timestamps: true,
    strict: false,
  }
);
export default model("sales", salesSchema);