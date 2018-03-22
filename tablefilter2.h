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
    /*-1: col mode not active
       0: waiting for selection of first col
       1: waiting for selection of 2nd col*/
    int colMode;

    element-array selectedCol1;
    element-array selectedCol2;

    element triggerButton;
    element colButton;

    element-array rows; //rows of the table, set on first triggerbutton press
    element-array cells;

    void attachTrigger();
    void selectMode();
    void filterActive();

    void hookRows();
    void hookCells();
}