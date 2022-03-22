let dotenv = require("dotenv");

dotenv.config();

module.exports.private_key = Buffer.from(
  process.env.PRIVATE_KEY,
  "base64"
).toString("ascii");
module.exports.public_key = Buffer.from(
  process.env.PUBLIC_KEY,
  "base64"
).toString("ascii");
