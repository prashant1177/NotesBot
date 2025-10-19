const fs = require("fs");
const pdfParse = require("pdf-parse"); // ✅ correct import
const natural = require("natural");
const stopword = require("stopword");
const syllable = require("syllable");

const wordTokenizer = new natural.WordTokenizer();
const sentenceTokenizer = new natural.SentenceTokenizer();

async function analyzePDF(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  console.log(pdfParse)
  const data = await pdfParse(dataBuffer); // ✅ correct function name
  const text = data.text;

  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim() !== "");

  let totalWords = 0;
  let totalSentences = 0;
  let totalSyllables = 0;
  let wordList = [];

  paragraphs.forEach((p) => {
    const sentences = sentenceTokenizer.tokenize(p);
    const words = wordTokenizer
      .tokenize(p)
      .filter((w) => /^[a-zA-Z]+$/.test(w));

    totalSentences += sentences.length;
    totalWords += words.length;
    wordList = wordList.concat(words.map((w) => w.toLowerCase()));
    words.forEach((word) => (totalSyllables += syllable(word)));
  });

  const fleschReadingEase = (
    206.835 -
    1.015 * (totalWords / totalSentences) -
    84.6 * (totalSyllables / totalWords)
  ).toFixed(2);

  const fleschKincaidGrade = (
    0.39 * (totalWords / totalSentences) +
    11.8 * (totalSyllables / totalWords) -
    15.59
  ).toFixed(2);

  const filteredWords = stopword.removeStopwords(wordList);
  const wordFrequency = {};
  filteredWords.forEach((word) => {
    wordFrequency[word] = (wordFrequency[word] || 0) + 1;
  });

  const topWords = Object.entries(wordFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  return {
    totalPages: data.numpages,
    totalParagraphs: paragraphs.length,
    totalWords,
    totalSentences,
    avgWordsPerSentence: Number((totalWords / totalSentences).toFixed(2)),
    readingTimeMinutes: Number((totalWords / 250).toFixed(2)),
    fleschReadingEase: Number(fleschReadingEase),
    fleschKincaidGrade: Number(fleschKincaidGrade),
    mostFrequentWords: topWords,
  };
}

/* analyzePDF("JAIR_18724.pdf")
  .then((stats) => console.log(stats))
  .catch((err) => console.error(err));
*/
module.exports = analyzePDF;
