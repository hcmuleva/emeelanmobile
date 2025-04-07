// ablyClient.js
import Ably from 'ably';
const REACT_APP_ABLY_API_KEY = process.env.REACT_APP_ABLY_API_KEY

const ably = new Ably.Realtime({ key: REACT_APP_ABLY_API_KEY });
export default ably;
