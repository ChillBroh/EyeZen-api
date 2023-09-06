exports.generateRandomWord = (req, res) => {
  try {
    const words = [
      "apple",
      "banana",
      "chocolate",
      "dog",
      "elephant",
      "football",
      "guitar",
      // Add more words to the list as needed
    ];

    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];
    
    res.status(200).json({ message: randomWord });
  } catch (error) {
    res.status(500).json({ error: "Error processing the word test" });
  }
};





