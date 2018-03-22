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

    int colsToSelect;
    element-array-array selectedCols; //array of arrays of elements

    element triggerButton;
    element colButton;

    element-array rows; //rows of the table, set on first triggerbutton press
    element-array cells;

    void attachTrigger();
    void selectMode();
    void filterActive();

    void hookRows();
    void hookCells();

    void beginColSelect(int number);
    void selectCol(event e);
}