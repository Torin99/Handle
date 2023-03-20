const tf = require("@tensorflow/tfjs");

const labels = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

const numOfClasses = 5;

const batchSize = 100;
const epochsValues = 5;

function createModel() {
  const model = tf.sequential();
  model.add(
    tf.layers.dense({
      units: 1,
      useBias: true,
      activation: "linear",
      inputDim: 1,
    })
  );
  return model;
}

async function run() {
  const data = tf.data.csv(
    "file//C:User/0B8284649/Desktop/handle/src/model/thumbs_up.csv"
  );
  const model = createModel();
  model.summary();
}

run();
