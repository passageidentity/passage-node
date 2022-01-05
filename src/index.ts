import Passage from "./classes/Passage";
module.exports = Passage;

interface PassagePublicKeyCache {
  [appID: string]: string;
}

export const passagePublicKeyCache: PassagePublicKeyCache = {};
export default Passage;
