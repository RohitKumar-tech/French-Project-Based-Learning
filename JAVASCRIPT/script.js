
  // Load the Google Cloud client library.
  google.charts.load('current', {'packages':['corechart']});
  google.load('language', '1');

  // Define the Google Translate API endpoint and the service account key file.
  const endpoint = 'https://translation.googleapis.com/language/translate/v2';
  const keyFile = '../PATH/TO/YOUR/SERVICE_ACCOUNT_KEY_FILE.json';

  // Initialize the Google Cloud client.
  const jwtClient = new google.auth.JWT(
    keyFile.client_email,
    null,
    keyFile.private_key,
    ['https://www.googleapis.com/auth/cloud-platform'],
    null
  );

  // Define the function to translate text using the Google Translate API.
  function translateText(text, targetLanguage) {
    // Create the API request.
    const request = {
      q: text,
      source: 'en',
      target: targetLanguage,
      key: keyFile.client_secret,
    };

    // Send the API request.
    jwtClient.authorize(function(err, tokens) {
      if (err) {
        console.log(err);
        return;
      }

      // Make the API request.
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + tokens.access_token,
        },
        body: JSON.stringify(request),
      };

      fetch(endpoint, options)
        .then(response => response.json())
        .then(data => {
          // Display the translated text.
          const translatedText = data.data.translations[0].translatedText;
          console.log(translatedText);
        })
        .catch(error => {
          console.log(error);
        });
    });
  }