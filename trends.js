// trends.js
import axios from "axios";
import config from "./config.js";

export async function getTrendingTopics() {
  const url = `https://trends.google.com/trending/rss?geo=${config.trends.geo}`;

  const xml = (await axios.get(url)).data;

  const matches = [...xml.matchAll(/<title>(.*?)<\/title>/g)]
    .map(m => m[1])
    .slice(1); // skip first "Daily Search Trends"

  return matches.slice(0, config.trends.maxTopics);
}
