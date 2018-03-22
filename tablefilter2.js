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
        this.colMode=0;

        this.attachTrigger();
    }

    attachTrigger()
    {
        this.triggerButton=document.createElement("a");
        this.triggerButton.classList.add("filter-trigger");
        this.triggerButton.href="";
        this.triggerButton.innerHTML="activate filter mode";

        this.colButton=document.createElement("a");
        this.colButton.classList.add("filter-trigger");
        this.colButton.classList.add("col-button");
        this.colButton.href="";
        this.colButton.innerHTML="colmode";

        this.stable.insertAdjacentElement("afterbegin",this.triggerButton);
        this.stable.insertAdjacentElement("afterbegin",this.colButton);

        this.triggerButton.addEventListener("click",(e)=>{
            e.preventDefault();

            if (!this.filterMode)
            {
                this.hookRows();
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

        this.colButton.addEventListener("click",(e)=>{
            e.preventDefault();

            if (!this.cells)
            {
                this.hookCells();
            }

            this.colMode=0;
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

    hookRows()
    {
        if (this.rows)
        {
            return;
        }

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
    }

    hookCells()
    {
        if (!this.rows)
        {
            this.hookRows();
        }

        this.cells=this.stable.querySelectorAll("td");

        for (var x=0,l=this.cells.length;x<l;x++)
        {
            this.cells[x].addEventListener("click",(e)=>{
                if (this.colMode==0)
                {
                    var cellpos=[...e.currentTarget.parentElement.children].indexOf(e.currentTarget);

                    this.selectedCol1=[];
                    for (var y=0;y<this.rows.length;y++)
                    {
                        this.selectedCol1.push(this.rows[y].children[cellpos]);
                    }

                    this.colMode=1;
                }

                else if (this.colMode==1)
                {
                    var cellpos=[...e.currentTarget.parentElement.children].indexOf(e.currentTarget);

                    this.selectedCol2=[];
                    for (var y=0;y<this.rows.length;y++)
                    {
                        this.selectedCol2.push(this.rows[y].children[cellpos]);
                    }

                    this.colMode=-1;

                    console.log(this.selectedCol1);
                    console.log(this.selectedCol2);
                }

            });
        }
    }
}

var tfilter=new tableFilter();