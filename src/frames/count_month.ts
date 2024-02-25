import { FrameActionDataParsed } from "frames.js";
const html = String.raw;


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

async function getTopFourProtocols() {
  const response = await fetch(
    "https://explorer.0xprotocol.org/apps?period=month&_data=routes%2Fapps%2Findex"
  );
  const data = await response.json();
  const entries = Object.entries(data.groupsWithRankAndChange);
  entries.sort((a, b) => a[1].rank - b[1].rank);
  return entries.slice(0, 4).map(([name, value]) => ({ name, ...value }));
}

export default {
  name: "count_month",
  logic: async (frameMessage: FrameActionDataParsed) => {
    const buttonIndex = frameMessage.buttonIndex;
    if (buttonIndex == 1) {
      return `poster`;
    }
    if (buttonIndex == 2) {
      return `count_day`;
    }
  },
  content: async () => {
    const topFourProtocols = await getTopFourProtocols();
    return html`
      <frame-image layout="main">
        <div
          style="
            font-family: 'Arial', sans-serif;
            display: flex;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            width: 100vw;
            height: 100vh;
            color: white;
            background: black;
            align-items: center;
            justify-items: center;
            line-height: 1;
            font-size: 2em;
            gap: 1rem;
            padding: 1.5rem;
          "
        >
          ${topFourProtocols.map(
            (protocol) => `
              <div style="display: flex; flex-direction: column; gap: 1rem; align-items: center; justify-content: center;">
                <span>Protocol: ${protocol.name}</span>
                <span>Volume: ${formatNumber(protocol.volume)}</span>
                <span>Trades: ${formatNumber(protocol.trades)}</span>
                <span>Traders: ${formatNumber(protocol.traders)}</span>
              </div>
            `
          ).join('')}
        </div>
      </frame-image>
      <frame-button> Back </frame-button>
      <frame-button> 24 hour stats</frame-button>
      <frame-button action="link" target="https://explorer.0xprotocol.org/">
      {🌐} Check out 0x Protocol Explorer
      </frame-button>
      <frame-button
        action="link"
        target="https://github.com/encrypted-soul/frames-0x-examples"
      >
        {😺} View on Github
      </frame-button>
    `;
  },
};