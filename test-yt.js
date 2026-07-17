process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

async function test() {
  const res = await fetch("https://custom-icon-badges.demolab.com/youtube/channel/subscribers/UCtoTrMdOt7GnX8YqPa5OpFQ");
  const text = await res.text();
  console.log(text.match(/aria-label=".*?: (.*?)"/)[1]);
}
test();
