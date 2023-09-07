exports.getAllWords = (req, res) => {
  try {
    res.status(200).json({ words }); // Send the array of words to the frontend
  } catch (error) {
    res.status(500).json({ error: "Error processing the word list" });
  }
};

exports.generateRandomWord = (req, res) => {
  try {
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];

    res.status(200).json({ message: randomWord });
  } catch (error) {
    res.status(500).json({ error: "Error processing the random word" });
  }
};





