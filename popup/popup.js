window.onload=main;

function main()
{
    chrome.tabs.query({active:true,currentWindow:true},(tab)=>{
        if (tab[0].url.slice(0,25)!="http://azurlane.wikiru.jp")
        {
            return;
        }

        chrome.tabs.executeScript({file:"tablefilter2.js"});
        document.querySelector(".msg").innerHTML="tables hooked";
    });
}
