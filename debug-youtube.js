async function debug() {
  const res = await fetch("https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=AGE8ed-80j4&format=json");
  const data = await res.json();
  console.log("Title:", data.title);
}
debug();
