const imagesWrapper = document.querySelector(".images");
const loadMoreBtn = document.querySelector(".load-more");
const searchInput = document.querySelector(".search-box input");
const lightBox = document.querySelector(".lightbox");
const closeLightBox = lightBox.querySelector(".uil-times");
const lightBoxWrapper = lightBox.querySelector(".wrapper");
const downloadImgBtn = lightBox.querySelector(".uil-import");

const apiKey = "HwLoMXVjQDavzy32dgcBvFnr3nmedvasP9RdoIQpXWbVHUvwSPR0iTPR";
const perPage = 15;
let currentPage = 1;
let searchTerm = null;

const downloadImg = async (imgURL)=>{
    
    // Converting received img to blob, creating its download link && downloading it.
    try {
        const file = await (await fetch(imgURL)).blob();
        const a = document.createElement("a");
        a.href = URL.createObjectURL(file);
        a.download = new Date().getTime();
        a.click();
    } catch (error) {
        alert("Failed to download image!");
        console.log(error);
    }

}

const showLightBox = (name,img) => {
    // add content to light box and show it
    lightBox.querySelector("img").src = img;
    lightBox.querySelector("span").textContent = name;
    // store data to use it later
    downloadImgBtn.setAttribute("data-img",img);
    lightBox.classList.add("show");
    // dont let to scrool while user is on lightbox
    document.body.style.overflow = "hidden";
}

const hideLightBox = () =>{
    lightBox.classList.remove("show");
    document.body.style.overflow = "auto";
}

const generateHTML = (images) =>{
    //adding all images to the existing image wrapper
    imagesWrapper.innerHTML += images.map(img =>
        `<li class="card" onclick = "showLightBox('${img.photographer}', '${img.src.large2x}')">
            <img src="${img.src.large2x}" alt="img">
            <div class="details">
                <div class="photographer">
                    <i class="uil uil-camera"></i>
                    <span>${img.photographer}</span>
                </div>
                <button onclick="downloadImg('${img.src.large2x}');event.stopPropagation();">
                    <i class="uil uil-import"></i>
                </button>
            </div>
        </li>
        `
    ).join("");
}

const getImages = async (apiURL) =>{
    //Fetching images by API call
    loadMoreBtn.innerText = "Loading...";
    loadMoreBtn.classList.add("disabled");

    try {
        const response = await fetch(apiURL,{
            headers:{Authorization:apiKey}
        });
    
        const data = await response.json();
        
        loadMoreBtn.innerText = "Load More";
        loadMoreBtn.classList.remove("disabled");
    
        generateHTML(data.photos);
    } catch (error) {
        alert("Failed to load images!");
    }

}

const loadMoreImages = (e) =>{
    currentPage++;
    let apiURL = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
    apiURL = searchTerm ? `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}` : apiURL; 
    getImages(apiURL);
}

const loadSearchImages = (e) =>{

    if(e.key === "Enter"){
        if(e.target.value === "") {
            location.reload();
            return;
        }
        currentPage = 1;
        searchTerm = e.target.value;
        imagesWrapper.innerHTML = "";
        getImages(`https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`);
    }

}

getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);

loadMoreBtn.addEventListener("click",loadMoreImages);
searchInput.addEventListener("keyup",loadSearchImages);
closeLightBox.addEventListener("click",hideLightBox);
lightBox.addEventListener("click",hideLightBox);
lightBoxWrapper.addEventListener("click",(e)=>e.stopPropagation());
downloadImgBtn.addEventListener("click",(e)=> downloadImg(e.target.dataset.img));