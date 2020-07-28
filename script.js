const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');


// Show Loading

function loading (){

    loader.hidden = false;
    quoteContainer.hidden = true;

}


// Hide loading

function complete (){

    if (!loader.hidden){
        quoteContainer.hidden = false
        loader.hidden = true
    }
}



// Get quote from API

async function getQuote(){
    loading()
    const proxyUrl = 'https://lit-harbor-95289.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
    
    try {
        const response = await fetch(proxyUrl+apiUrl);
        const data = await response.json();

        data.quoteAuthor === '' ? authorText.innerText = 'Unknown': authorText.innerText = data.quoteAuthor
        
        data.quoteText.length > 50 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote')
        authorText.innerText = data.quoteAuthor;
        quoteText.innerText = data.quoteText;

        complete()

    }
    catch (error){
        getQuote();
    }



}

// Tweet Quote
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
    window.open(twitterUrl,'_blank')
}


// Event Listeners
newQuoteButton.addEventListener('click',getQuote)
twitterButton.addEventListener('click',tweetQuote)

getQuote()