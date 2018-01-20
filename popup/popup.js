window.onload=main;

function main()
{
    var buttons=document.querySelector("a");

    buttons.addEventListener("click",(e)=>{
        e.preventDefault();

        chrome.tabs.executeScript({file:"tablefilter2.js"});
    });
}
