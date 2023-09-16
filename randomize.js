const axios = require('axios');
const apiKey = 'YOUR_OPENAI_API_KEY';

// Create a function to generate questions
async function generateQuestions(userInput) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/text-davinci-002/completions',
      {
        prompt: `Generate questions based on the following text: ${userInput}`,
        max_tokens: 50, // Adjust as needed
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error generating questions:', error);
    return 'An error occurred while generating questions.';
  }
}

// Set up your server and route to handle user requests
