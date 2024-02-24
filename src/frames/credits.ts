import { FrameActionDataParsed } from "frames.js";
const html = String.raw;

export default {
  name: "credits",
  logic: (message: FrameActionDataParsed) => {
    if (message.buttonIndex == 1) {
      return `count`;
    }
  },
  content: () => html`
    <frame-image src="/images/credits.png" />
    <frame-button> ⬅️ Back </frame-button>
    <frame-button action="link" target="https://explorer.0xprotocol.org/">
      {🌐} Check out 0x Protocol Explorer
    </frame-button>
    <frame-button
      action="link"
      target="https://github.com/encrypted-soul/frames-tally-proposals"
    >
      {😺} View on Github
    </frame-button>
  `,
};
