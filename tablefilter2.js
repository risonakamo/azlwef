class tableFilter
{
    constructor()
    {
        document.head.insertAdjacentHTML("beforeend",`<link rel="stylesheet" href="${chrome.runtime.getURL("tablefilter.css")}">`);

        var allTables=document.querySelectorAll(".style_table");
        var newTb;

        for (var x=0;x<allTables.length;x++)
        {
            new tableController(allTables[x]);
        }
    }
}

class tableController
{
    constructor(stable)
    {
        this.stable=stable;
        this.stable.classList.add("trigger-table");

        this.filterMode=0;

        this.attachTrigger();
    }

    attachTrigger()
    {
        this.triggerButton=document.createElement("div");
        this.triggerButton.classList.add("filter-trigger");
        this.triggerButton.innerHTML="activate filter mode";

        this.stable.insertAdjacentElement("afterbegin",this.triggerButton);

        this.triggerButton.addEventListener("click",(e)=>{
            if (!this.filterMode)
            {
                this.rows=this.stable.querySelectorAll("tbody>tr");

                this.selectMode();
            }

            else if (this.filterMode==1)
            {
                this.filterActive();
            }

            else
            {
                this.selectMode();
            }
        });
    }

    selectMode()
    {
        this.filterMode=1;
        this.stable.classList.remove("filter-active");

        for (var x=0;x<this.rows.length;x++)
        {
            this.rows[x].addEventListener("click",(e)=>{
                e.currentTarget.classList.add("selected");
            });
        }
    }

    filterActive()
    {
        this.filterMode=2;

        this.stable.classList.add("filter-active");
    }
}

var tfilter=new tableFilter();