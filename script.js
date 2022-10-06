const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

// Get Quote From API
async function getQuote() {
  //   const proxyUrl = "https://cors-anywhere.herokuap.com/";
  //   const apiUrl =
  //     "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

  const apiUrl = "https://type.fit/api/quotes";
  try {
    // const response = await fetch(proxyUrl + apiUrl);
    const randomNumber = Math.floor(Math.random() * 1600);
    console.log(randomNumber);
    const response = await fetch(apiUrl);
    const data = await response.json();

    // if author is blank, add "unknown"
    if (data[randomNumber].quoteAuthor === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data[randomNumber].author;
    }
    quoteText.innerText = data[randomNumber].text;

    // Reduce  font size for long quotes
    if (data[randomNumber].quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText[randomNumber].remove("long-quote");
    }
  } catch (error) {
    // getQuote()
  }
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  console.log(quote, author, "ad");
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// EventListners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuote();
