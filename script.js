const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newquote = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner(){
    loader.hidden=false;
    quoteContainer.hidden = true;
}

function hideLoadingSpinner(){
    if(!loader.hidden){
        loader.hidden=true;
        quoteContainer.hidden = false; 
    }
}

//Quote API
async function getQuote(){
    showLoadingSpinner();
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
/*     const apiUrl = "http://api.forismatic.com/en/api/1.0/?method=getQuote&lang=en&format=json";
 */    const apiUrl = " http://quotes.stormconsultancy.co.uk/random.json";
        try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.author===''){
            authorText.innerText='Unknown';
        }else{
            authorText.innerText=data.author;
        }
        if(data.quote.length>=50){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText=data.quote;
        console.log(data);
        hideLoadingSpinner()
    }catch(error){
        hideLoadingSpinner()
        quoteContainer.classList.add('quote-container-error');
        quoteText.innerText =":( Sorry, Something went wrong";
        authorText.Text='';
        console.log('Sorry No quote',error)
    }

}

function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote}--${author}`;
    window.open(twitterUrl,'_blank');
}

//Event Listeners
newquote.addEventListener('click',getQuote);
twitterButton.addEventListener('click',tweetQuote);
getQuote();
