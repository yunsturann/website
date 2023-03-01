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

$("#copy").click(()=>{
    navigator.clipboard.writeText(quoteGenerator.quote);
    Alert("Quote Copied!");
});

$("#save").click((e)=>{
    let item ={
        quote: quoteGenerator.quote,
        author: quoteGenerator.author
    }
    quoteGenerator.savedQuotes.push(item);
    localStorage.setItem("quotes",JSON.stringify(quoteGenerator.savedQuotes));
    Alert("Saved succesfully!");
});

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




