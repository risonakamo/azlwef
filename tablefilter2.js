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
        this.triggerButton=document.createElement("a");
        this.triggerButton.classList.add("filter-trigger");
        this.triggerButton.href="";
        this.triggerButton.innerHTML="activate filter mode";

        this.stable.insertAdjacentElement("afterbegin",this.triggerButton);

        this.triggerButton.addEventListener("click",(e)=>{
            e.preventDefault();

            if (!this.filterMode)
            {
                this.rows=this.stable.querySelectorAll("tbody>tr");

                for (var x=0;x<this.rows.length;x++)
                {
                    this.rows[x].addEventListener("click",(e)=>{
                        if (this.filterMode==1)
                        {
                            e.currentTarget.classList.toggle("selected");
                        }
                    });
                }

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
        this.triggerButton.innerHTML="apply filter";
        this.stable.classList.remove("filter-active");
    }

    filterActive()
    {
        this.filterMode=2;
        this.triggerButton.innerHTML="reselect filter";
        this.stable.classList.add("filter-active");
    }
}

var tfilter=new tableFilter();