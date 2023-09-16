const questionInput = document.getElementById("question-input");
const postButton = document.getElementById("post-button");
const qaList = document.getElementById("qa-list");

postButton.addEventListener("click", () => {
    const questionText = questionInput.value.trim();
    if (questionText === "") {
        alert("Please enter a question.");
        return;
    }

    // Create a new list item for the question and add it to the list
    const listItem = document.createElement("li");
    listItem.textContent = `Question: ${questionText}`;
    qaList.appendChild(listItem);

    // Clear the input field
    questionInput.value = "";
});

// Allow users to press Enter to post a question
questionInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent the Enter key from adding a new line in the textarea
        postButton.click(); // Simulate a click on the Post button
    }
});



//The generative AI


const apiKey = 'YOUR_GPT3_API_KEY'; // Replace with your GPT-3 API key
        openai.configure({"opentdb.com/api.php?amount=10&category=9&type=multiple"});

        const generateMCQ = async (question) => {
            try {
                const response = await openai.Completion.create({
                    engine: 'davinci',
                    prompt: `Generate multiple-choice questions for the following: ${question}`,
                    max_tokens: 100
                });

                const mcqQuestion = response.choices[0].text.trim();
                return mcqQuestion;
            } catch (error) {
                console.error('Error generating MCQ:', error);
                return 'Error generating MCQ questions.';
            }
        };

        const displayMCQ = (question) => {
            const mcqContainer = document.getElementById('mcq-container');
            mcqContainer.innerHTML = ''; // Clear previous content

            // Display the generated MCQ question
            const mcqQuestionElement = document.createElement('div');
            mcqQuestionElement.textContent = question;
            mcqContainer.appendChild(mcqQuestionElement);
        };

        const generateButton = document.getElementById('generate-button');
        generateButton.addEventListener('click', async () => {
            const inputQuestion = document.getElementById('input-question').value;
            if (inputQuestion) {
                const generatedMCQ = await generateMCQ(inputQuestion);
                displayMCQ(generatedMCQ);
            } else {
                alert('Please enter a question.');
            }
        });
