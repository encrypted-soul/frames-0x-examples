import { decrementCount, getCount, incrementCount } from "../data/count.js";
import { FrameActionDataParsed } from "frames.js";
const html = String.raw;

const count = await getCount();

async function getRankData(rank: number) {
  const response = await fetch(
    "https://explorer.0xprotocol.org/apps?period=month&_data=routes%2Fapps%2Findex"
  );
  const data = await response.json();
  const entries = Object.entries(data.groupsWithRankAndChange);
  const rankEntry = entries.find(([key, value]) => value.rank === rank + 1);
  return rankEntry ? { name: rankEntry[0], ...rankEntry[1] } : null;
}

function formatNumber(num: number) {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + "B";
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + "M";
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(2) + "K";
  } else {
    return num.toString();
  }
}

export default {
  name: "count",
  logic: async (frameMessage: FrameActionDataParsed) => {
    const buttonIndex = frameMessage.buttonIndex;
    if (buttonIndex == 1) {
      if (count <= 0) {
        return `poster`;
      } else {
        await decrementCount();
        return `count`;
      }
    } else {
      if (count >= 4) {
        return `credits`;
      } else {
        await incrementCount();
        return `count`;
      }
    }
  },
  content: async () => {
    const rankData = await getRankData(count);
    return html`
      <frame-image layout="main">
        <div
          style="
                        font-family: 'Courier New', Courier, monospace;
                        display: flex;
                        flex-direction: column;
                        width: 100vw;
                        height: 100vh;
                        color: lime;
                        background: black;
                        align-items: center;
                        justify-content: center;
                        line-height: 1;
                        font-size: 2em;
                    "
        >
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${rankData
              ? `
                            <span>Protocol: ${rankData.name}</span>
                            <span>Volume: ${formatNumber(rankData.volume)}</span>
                            <span>Trades: ${formatNumber(rankData.trades)}</span>
                            <span>Traders: ${formatNumber(rankData.traders)}</span>
                        `
              : `I've been framed ${count || 0} times`}
          </div>
        </div>
      </frame-image>
      <frame-button> Back </frame-button>
      <frame-button> Next </frame-button>
    `;
  },
};
