
function getDailyRandomIndex(seed, length) {
  const x = Math.sin(seed) * 10000;
  return Math.floor((x - Math.floor(x)) * length);
}

const today = new Date();
const daySeed = today.getFullYear() * 1000 + today.getMonth() * 100 + today.getDate(); 

fetch("verses.json")
  .then(res => res.json())
  .then(verses => {
    const index = getDailyRandomIndex(daySeed, verses.length);
    const verse = verses[index];

    document.getElementById("verse-text").textContent = `"${verse.text}"`;
    document.getElementById("verse-reference").textContent = verse.reference;
  })
  .catch(() => {
    document.getElementById("verse-text").textContent = "Verse not available.";
  });