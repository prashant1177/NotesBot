
const crypto = require("crypto");

function shortHash() {
  const str = Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
  return crypto.createHash("md5").update(str).digest("base64url").substring(0, 8);
}

module.exports = { shortHash };