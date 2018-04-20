class tableFilter
{
    constructor()
    {
        document.head.insertAdjacentHTML("beforeend",`<link rel="stylesheet" href="${chrome.runtime.getURL("tablefilter.css")}">`);

        var allTables=document.querySelectorAll(".style_table");
        // var allTables=document.querySelectorAll("table.wikitable.sortable.jquery-tablesorter");

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
        var controls=document.createElement("div");
        controls.classList.add("filter-trigger");
        controls.innerHTML=`<a href="">activate filter mode</a><a href="" title="click on damage column (which contains an X) and then click the output column">calculate burst</a><a href="" title="click on the burst damage column, then click on the reload time column, then click on an output column">calculate dps</a>`;

        this.stable.insertAdjacentElement("afterbegin",controls);

        this.triggerButton=controls.children[0];

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

        controls.children[1].addEventListener("click",(e)=>{
            e.preventDefault();

            if (!this.cells)
            {
                this.hookCells();
            }

            this.currentCalcFunction=this.calculateBurst;
            this.beginColSelect(2);
        });

        controls.children[2].addEventListener("click",(e)=>{
            e.preventDefault();

            if (!this.cells)
            {
                this.hookCells();
            }

            this.currentCalcFunction=this.calculateDps;
            this.beginColSelect(3);
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
                if (this.colsToSelect>0)
                {
                    this.selectCol(e);
                    this.colsToSelect--;

                    if (this.colsToSelect==0)
                    {
                        this.currentCalcFunction(this.selectedCols);
                    }
                }
            });
        }
    }

    //enter number of columns to be selectable
    beginColSelect(number)
    {
        this.selectedCols=[];
        this.colsToSelect=number;
    }

    //given a clicked cell event, select the column of that cell, puts into selectedCols
    selectCol(e)
    {
        var cellpos=[...e.currentTarget.parentElement.children].indexOf(e.currentTarget);

        var selectedCol=[];
        for (var y=0;y<this.rows.length;y++)
        {
            selectedCol.push(this.rows[y].children[cellpos]);
        }

        this.selectedCols.push(selectedCol);
    }

    //requires [dmg,output] cols selected
    //cols should be [[dmgcol],[outputcol]]
    calculateBurst(cols)
    {
        var splitDmg;
        for (var x=0,l=cols[0].length;x<l;x++)
        {
            splitDmg=cols[0][x].innerText.split("x");
            cols[1][x].innerText=splitDmg[0]*splitDmg[1];
            cols[1][x].classList.add("col-selected");
        }
    }

    //select burst column, reload column, then output column
    //[0:(burst) damage,1:reload,2:output]
    calculateDps(cols)
    {
        for (var x=0,l=cols[0].length;x<l;x++)
        {
            cols[2][x].innerText=(cols[0][x].innerText/parseFloat(cols[1][x].innerText)).toFixed(3);
            cols[2][x].classList.add("col-selected");
        }
    }
}

var tfilter=new tableFilter();