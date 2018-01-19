class tableFilter
{
    constructor()
    {
        document.head.insertAdjacentHTML("beforeend",`<link rel="stylesheet" href="${chrome.runtime.getURL("tablefilter.css")}">`);

        var allTables=document.querySelectorAll(".style_table");

        console.log(allTables);

        for (var x=0;x<allTables.length;x++)
        {
            allTables[x].addEventListener("click",(e)=>{
                if (!this.stable)
                {
                    this.stable=e.currentTarget;
                    console.log("table selected",this.stable);

                    this.tableSelectMode();
                }
            });
        }

        chrome.runtime.onMessage.addListener((msg)=>{

        });
    }

    tableSelectMode()
    {
        this.rows=this.stable.querySelectorAll("tbody>tr");

        for (var x=0;x<this.rows.length;x++)
        {
            this.rows[x].addEventListener("click",(e)=>{
                if (this.stable)
                {
                    e.currentTarget.classList.toggle("selected");
                }
            });
        }
    }

    triggerFilter()
    {
        for (var x=0;x<this.rows.length;x++)
        {
            if (!this.rows[x].classList.contains("selected"))
            {
                this.rows[x].style.display="none";
            }
        }
    }

    resetFilter()
    {
        for (var x=0;x<this.rows.length;x++)
        {
            this.rows[x].style.display="";
            this.rows[x].classList.remove("selected");
        }

        delete this.stable;
    }
}

var azlptf=new tableFilter();