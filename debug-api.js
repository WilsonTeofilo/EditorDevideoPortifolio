process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
async function debug() {
  const ts = Date.now();
  const res = await fetch(`https://komarev.com/ghpvc/?username=LokkitaEdxPortifolio2026&style=flat&t=${ts}`);
  console.log("CORS Headers:", res.headers.get("access-control-allow-origin"));
}
debug();
