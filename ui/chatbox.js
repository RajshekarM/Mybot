const chatWindow = document.getElementById("chat-window");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

    // Define a function for creating a user message element
    function createUserMessage(message) {
        // Create a list item element
        let li = document.createElement("li");
        // Add a class name for styling
        li.className = "user-message";
        // Create a span element for the message bubble
        let span = document.createElement("span");
        // Add a class name for styling
        span.className = "message-bubble";
        // Set the text content to the message
        span.textContent = message;
        // Append the span to the list item
        li.appendChild(span);
        // Return the list item element
        return li;
    }

    // Define a function for creating a bot message element
    function createBotMessage(message) {
         // Create a list item element
         let li = document.createElement("li");
         // Add a class name for styling
         li.className = "bot-message";
         // Create a span element for the message bubble
         let span = document.createElement("span");
         // Add a class name for styling
         span.className = "message-bubble";
         // Set the text content to the message
         span.textContent = message;
         // Append the span to the list item
         li.appendChild(span);
         // Return the list item element 
         return li;
     }

     // Define a function for sending a user message to the chatbot using REST API 
     function sendUserMessage(message) {
          // Create an object with user input as data 
          let data = {user_input: message};
          // Convert data object to JSON string 
          let json_data = JSON.stringify(data);
          console.log(json_data); 
          /* Make an HTTP POST request using fetch API with following parameters: 
             - URL: http://localhost:5000/ (change this if your chatbot is running on different port or host) 
             - Headers: Content-Type: application/json (specify that we are sending JSON data) 
             - Body: json_data (the JSON string that we created above) */
          fetch('http://localhost:5000/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: json_data,
          })
          .then(response => response.json())  /* Parse response as JSON */
          .then(data => {  /* Handle data object */
              console.log(data);  /* Log data object to console */
              let bot_message = data.bot_output;  /* Get bot output from data object */
              showBotMessage(bot_message);  /* Show bot output on chat window */
          })
          .catch(error => {  /* Handle error */
              console.error(error);  /* Log error to console */
              showBotMessage("Sorry, something went wrong.");  /* Show error message on chat window */
          });
      }

      // Define a function for showing user input on chat window 
      function showUserMessage(message) {
           if (message.trim() !== "") {  /* Check if message is not empty or whitespace */
               let user_message_element = createUserMessage(message);  /* Create user message element using helper function */  
               chatWindow.appendChild(user_message_element);  /* Append user message element to chat window */  
               userInput.value = "";  /* Clear user input field */  
               chatWindow.scrollTop = chatWindow.scrollHeight;   /* Scroll down chat window */  
           }
       }

       // Define a function for showing bot output on chat window 
       function showBotMessage(message) {
            if (message.trim() !== "") {   /* Check if message is not empty or whitespace */  
                let bot_message_element= createBotMessage(message);   /* Create bot message element using helper function */   
                chatWindow.appendChild(bot_message_element);   /* Append bot message element to chat window */   
                userInput.value= "";   /* Clear user input field */   
                chatWindow.scrollTop=chatWindow.scrollHeight;
                /* Scroll down chat window */  
            }
        }

        // Add an event listener for click event on send button 
        sendButton.addEventListener("click", function() {
            let user_message = userInput.value;  /* Get user input value */  
            console.log(user_message)
            showUserMessage(user_message);  /* Show user input on chat window */  
            sendUserMessage(user_message);  /* Send user input to chatbot using REST API */  
        });

        // Add an event listener for keypress event on user input field 
        userInput.addEventListener("keypress", function(event) {
            if (event.keyCode === 13) {  /* Check if key pressed is enter key (13) */
                let user_message = userInput.value;  /* Get user input value */  
                showUserMessage(user_message);  /* Show user input on chat window */  
                sendUserMessage(user_message);  /* Send user input to chatbot using REST API */  
            }
        });