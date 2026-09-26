async function debug() {
  const res = await fetch("https://www.youtube.com/oembed?url=https://www.youtube.com/channel/UCtoTrMdOt7GnX8YqPa5OpFQ&format=json");
  const text = await res.text();
  console.log(text);
}
debug();
