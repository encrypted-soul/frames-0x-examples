import { FrameActionDataParsed } from "frames.js";
const html = String.raw;

export default {
  name: "poster",
  logic: (message: FrameActionDataParsed) => {
    if (message.buttonIndex == 1) {
      return `count`;
    }
  },
  content: () => html`
    <frame-image src="/images/poster.png" />
    <frame-button> {🚀} Lets get started </frame-button>
    <frame-button
      action="link"
      target="https://github.com/encrypted-soul/frames-0x-examples"
    >
      {😺} View on Github
    </frame-button>
  `,
};
