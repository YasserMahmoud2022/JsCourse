
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

function newQuote(){
    loading();
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    //console.log(qoute);
    if(!quote.author){
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    
    if(quote.text.length > 120){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote')
    }

    quoteText.textContent = quote.text;
    complete();
}

function tweetQoute(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank'); // '_blank' -> to let twitter window open in an new tab
}

// Get Quotes from API
async function getQuotes(){
    loading();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    //const apiUrl = 'https://zenquotes.io/api/quotes';
    //const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(apiUrl);
        // use proxy to not has an error for CORS access in local server
        //const response = await fetch(proxyUrl + apiUrl);
        apiQuotes = await response.json();
        //console.log(apiQuotes[12]);
        newQuote();
    } catch (error) {
        // Get Error here
        //getQuotes(); // for when raising error of Unexpected token
        console.log('Whoops, no quote', error);
        // Solve enventy loob ???!!!
    }
}

// Event 
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQoute);

// on load
 getQuotes();
//loading();