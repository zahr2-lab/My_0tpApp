// const Ghasedak = require("ghasedak");
// const ghasedak = new Ghasedak(
// "f5ad377f983c656ef7173abe66e98acd643d2e4c4f05093eb2c5572f169293e4"
// );

export default async (req, res) => {
  const { method } = req;
  method === "POST" && console.log("hiiiiiiiiiiiiiiiiiiiiii");
  // res.end("yes");
};
