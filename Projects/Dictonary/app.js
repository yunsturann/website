

$("#submit").click(searchWord);

function searchWord(e){
    e.preventDefault();
    let word = $("#word-input").val();
    let url = "https://api.dictionaryapi.dev/api/v2/entries/en/"+ word;
    fetch(url).then(function(response){
        if(!response.ok){
            throw new Error("Word not found!");
        }
        return response.json();
    }).then(function(res){
        
    
       /* for(let i = 0;res[0].meanings.length;i++){
            setTimeout(() => {
                console.log(res[0].meanings);
                $("#word").text(res[0].meanings[i].word);
                $("#pos").text(res[0].meanings[i].partOfSpeech);
                $("#meaning").text(res[0].meanings[i].definitions[0].definition);
            },i * 1000);
        }*/
        $("#word").text(res[0].meanings[0].word);
        $("#pos").text(res[0].meanings[0].partOfSpeech);
        $("#meaning").text(res[0].meanings[0].definitions[0].definition);

    }).catch((err)=>{
        alert(err);
    })

}