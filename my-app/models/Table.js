import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Check if the model already exists
const Table =
  mongoose.models.Table ||
  mongoose.model(
    "Table",
    new Schema({
      ffnWeights: {
        type: [
          {
            key: String,
            value: Number,
          },
        ],
        default: undefined, // Set default to undefined to prevent automatic creation
      },
      prs: {
        type: [
          {
            name: String,
            weight: Number,
            subPrs: [
              {
                name: String,
                weight: Number,
              },
            ],
          },
        ],
        default: undefined, // Set default to undefined to prevent automatic creation
      },
      subPrs: {
        type: [
          {
            name: String,
            weight: Number,
          },
        ],
        default: undefined, // Set default to undefined to prevent automatic creation
      },
      pairwiseComparisons: {
        type: {
          table_0: [[String]],
          table_1: [[String]],
          table_2: [[String]],
        },
        default: undefined, // Set default to undefined to prevent automatic creation
      },
      sdrs1: {
        type: [
          {
            name: String,
          },
        ],
        default: undefined, // Set default to undefined to prevent automatic creation
      },
      sdrs2: {
        type: [
          {
            name: String,
          },
        ],
        default: undefined, // Set default to undefined to prevent automatic creation
      },
      sdr1PrRelation: {
        type: {
          table_0: [[String]],
          table_1: [[String]],
          table_2: [[String]],
        },
        default: undefined, // Set default to undefined to prevent automatic creation
      },
      sdr2PrRelation: {
        type: {
          table_0: [[String]],
          table_1: [[String]],
          table_2: [[String]],
        },
        default: undefined, // Set default to undefined to prevent automatic creation
      },
    },
    { timestamps: true }
  )
  );

export default Table;
