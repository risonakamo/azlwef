class tableFilter
{
    //nothing, just attaches tablecontrollers.
    //why is it a class?
}

class tableController
{
    element stable; //the table element tablecontroller is attached to
    /*filter is active or not, or not initialised
      0: uninitialised
      1: select mode (allow for clicking)
      2: active (showing selected stuff)*/
    int filterMode;

    int colsToSelect; //temp used during column selection
    element-array-array selectedCols; //array of arrays of elements

    element triggerButton;

    element-array rows; //rows of the table, set on first triggerbutton press
    element-array cells;

    function currentCalcFunction; //function to execute at end of col select

    void attachTrigger(); //initialise stuff on tables
    void selectMode(); //enter select mode
    void filterActive();

    //store row/cell data
    void hookRows();
    void hookCells();

    void beginColSelect(int number);
    void selectCol(event e);

    void calculateBurst(array cols);
    void calculateDps(array cols);
}