import { getStore } from "@netlify/blobs";

const getCount = async () => {
  const store = getStore("gameState");
  const rawCount = await store.get("count");
  let count = parseInt(rawCount);
  if (Number.isNaN(count)) count = 0;
  return count;
};

const incrementCount = async () => {
  const store = getStore("gameState");
  const rawCount = await store.get("count");
  let newCount = null;
  if (rawCount === "NaN") {
    newCount = 1;
  }
  else {
    newCount = parseInt(rawCount) + 1;
    console.log("the new count is")
    console.log(newCount)
  }
  await store.set("count", newCount.toString());
  return newCount;

};

const decrementCount = async () => {
  const store = getStore("gameState");
  const rawCount = await store.get("count");
  const newCount = parseInt(rawCount) - 1;
  await store.set("count", newCount.toString());
  return newCount;
};

export { getCount, incrementCount, decrementCount };
