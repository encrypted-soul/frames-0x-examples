import { FrameActionDataParsed } from "frames.js";
const html = String.raw;

export default {
  name: "poster",
  logic: (message: FrameActionDataParsed) => {
    if (message.buttonIndex == 2) {
      return `count_month`;
    }
    if (message.buttonIndex == 1) {
      return `count_day`;
    }
  },
  content: async () => {
    return html`
    <frame-image src="/images/poster.png" />
    <frame-button> 24 hour stats </frame-button>
    <frame-button> 30 day stats </frame-button>
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
