import { getStore } from "@netlify/blobs";
import { parse } from "path";

const getCount = async () => {
  const store = getStore({name: "gameState", siteID: process.env.NETLIFY_SITE_ID, token: process.env.NETLIFY_AUTH_TOKEN});
  const rawCount = await store.get("count");
  let count = parseInt(rawCount);
  if (Number.isNaN(count)) count = 0;
  return count;
};

const incrementCount = async () => {
  const store = getStore({name: "gameState", siteID: process.env.NETLIFY_SITE_ID, token: process.env.NETLIFY_AUTH_TOKEN});
  const rawCount = await store.get("count");
  let newCount = null;
  console.log("the rawCOunt over here is")
  console.log(rawCount)
  if (rawCount === "NaN") {
    console.log("is it coming in if")
    newCount = 1;
  }
  else {
    console.log("is it coming in else")
    console.log(parseInt(rawCount))
    console.log(parseInt(rawCount) + 1)
    console.log("that's it")
    newCount = parseInt(rawCount) + 1;
    console.log("the new count is")
    console.log(newCount)
  }
  await store.set("count", newCount.toString());
  return newCount;

};

const decrementCount = async () => {
  const store = getStore({name: "gameState", siteID: process.env.NETLIFY_SITE_ID, token: process.env.NETLIFY_AUTH_TOKEN});
  const rawCount = await store.get("count");
  const newCount = parseInt(rawCount) - 1;
  await store.set("count", newCount.toString());
  return newCount;
};

export { getCount, incrementCount, decrementCount };
