window.onload=main;

function main()
{
    var buttons=document.querySelectorAll("a");

    buttons[0].addEventListener("click",(e)=>{
        e.preventDefault();

        chrome.tabs.executeScript({file:"tablefilter.js"});
    });

    buttons[1].addEventListener("click",(e)=>{
        e.preventDefault();

        chrome.tabs.query({active:true,currentWindow:true},(tab)=>{
            chrome.tabs.sendMessage(tab[0].id,{a:"a"});
        });
    });
}
