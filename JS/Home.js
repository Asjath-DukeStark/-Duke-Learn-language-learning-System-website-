const pathName = window.location.pathname;
const pageName = pathName.split("/").pop();

if (pageName === "Home.html"){
    document.querySelector(".home").classList.add("active");
}
if (pageName === "Quiz.html"){
    document.querySelector(".quiz").classList.add("active");
}
if (pageName === "listing.html"){
    document.querySelector(".listing").classList.add("active");
}
if (pageName === "newletter.html"){
    document.querySelector(".newsletter").classList.add("active");
}
if (pageName === "Query.html"){
    document.querySelector(".query").classList.add("active");
}
if (pageName === "Gallery.html"){
    document.querySelector(".gallery").classList.add("active");
}
if (pageName === "aboutUs.html"){
    document.querySelector(".aboutus").classList.add("active");
}
if (pageName === "product.html"){
    document.querySelector(".shop").classList.add("active");
}





