exports.generateRandom = (req,res) => {
  try {
    const characters = "CDEFGHJKLMNOPQRSTUVWXYZ";
    const randomIndex = Math.floor(Math.random() * characters.length);
    // return characters.charAt(randomIndex);
    res.status(200).json({ message: characters.charAt(randomIndex) });
  } catch (error) {
    res.status(500).json({ error: "Error processing the eye test" });
  }
};

// exports.update = (req,res) => {
//   try {
//     const characters = "CDEFGHJKLMNOPQRSTUVWXYZ";
//     const randomIndex = Math.floor(Math.random() * characters.length);
//     // return characters.charAt(randomIndex);
//     res.status(200).json({ message: characters.charAt(randomIndex) });
//   } catch (error) {
//     res.status(500).json({ error: "Error processing the eye test" });
//   }
// };

// // Route to start the eye test and check the user's input
// exports.eyeTest = async (req, res) => {
//   try {
//     const { action, userInput } = req.body;

//     if (action === "start") {
//       // Start the eye test
//       if (chancesLeft > 0) {
//         // Generate a random English character for the test
//         displayedNumber = generateRandomCharacter();
//         res.json({ displayedNumber, chancesLeft });
//       } else {
//         res.json({ message: "No more chances left" });
//       }
//     } else if (action === "check") {
//       // Check the user's input
//       if (chancesLeft > 0) {
//         if (userInput === displayedNumber) {
//           // User's input is correct
//           correctCount++;
//           displayedNumber = generateRandomCharacter(); // Move to the next number
//           res.json({ message: "Correct", correctCount, displayedNumber });
//         } else {
//           // User's input is incorrect
//           chancesLeft--;
//           if (chancesLeft === 0) {
//             res.json({ message: "No more chances left" });
//           } else {
//             res.json({ message: "Incorrect", chancesLeft });
//           }
//         }
//       } else {
//         res.json({ message: "No more chances left" });
//       }
//     } else {
//       res.status(400).json({ message: "Invalid action" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Error processing the eye test" });
//   }
// };


