
// to prevent saving the same quote
let saveRepeat = false; 

let quoteGenerator = {
    savedQuotes: [],
    author:"",
    quote:"",
    url: "https://api.quotable.io/random",
    fetchData: (url)=>{
        $("#submit").text("Loading...");
        fetch(url)
        .then((response)=>response.json())
        .then((data)=>{
            $("#submit").text("Generate a Quote");
            quoteGenerator.displayData(data);
        });
    },
    displayData: (data)=>{
        saveRepeat = false;
        quoteGenerator.author = data.author
        quoteGenerator.quote = data.content;
        $("#quote").text("“"+quoteGenerator.quote+"”");
        $("#author").text("- "+ quoteGenerator.author);
        $(".icons").show();
    }
};

// click event generate a quote
$("#submit").click(()=>{
    quoteGenerator.fetchData(quoteGenerator.url);
});
// copy event to the clipboard
$("#copy").click(()=>{
    navigator.clipboard.writeText(quoteGenerator.quote);
    Alert("Quote Copied!");
});
// save the quote
$("#save").click((e)=>{
    if(saveRepeat === true){
        Alert("The quote is already saved!");
        return;
    }
    saveRepeat = true;
    let item ={
        quote: quoteGenerator.quote,
        author: quoteGenerator.author
    }
    quoteGenerator.savedQuotes.push(item);
    localStorage.setItem("quotes",JSON.stringify(quoteGenerator.savedQuotes));
    Alert("Saved succesfully!");
});
// show alert when invoked
function Alert(text){
    $(".container").append("<p class='message'>"+text+"</p>");
    setTimeout(()=>{
    $(".message").remove();
    },1500);
}

//when document ready
$(function () {
    if(localStorage.getItem("quotes") !=null){
        quoteGenerator.savedQuotes = JSON.parse(localStorage.getItem("quotes"));
    }
});




