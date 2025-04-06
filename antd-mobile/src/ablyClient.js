// ablyClient.js
import * as Ably from 'ably/promises';

const ably = new Ably.Realtime.Promise({ key: "YOUR_ABLY_FRONTEND_API_KEY" });
export default ably;
