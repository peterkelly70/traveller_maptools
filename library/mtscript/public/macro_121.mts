<!-- addList Macro -->
[h: macroName = "addList"]
[h: debug("Entering " + macroName)]

[h: list = arg(0)]
[h: valueToAdd = arg(1)]
[h: ensureUnique = arg(2)]

<!-- Default behavior: just append -->
[h: resultList = listAppend(list, valueToAdd)]
[h: debug("Initial List: " + list)]
[h: debug("Value to Add: " + valueToAdd)]
[h: debug("Ensure Unique: " + ensureUnique)]

<!-- If ensureUnique is set to 1, check for uniqueness -->
[h, if(ensureUnique == 1), code: {
    [h, if(listFind(list, valueToAdd) == -1), code: {
        [h: resultList = listAppend(list, valueToAdd)]
        [h: debug("Value '" + valueToAdd + "' added to the list.")]
    };{
        [h: resultList = list]
        [h: debug("Value '" + valueToAdd + "' is already in the list.")]
    }]
};{
    [h: debug("Value '" + valueToAdd + "' appended without checking uniqueness.")]
}]

<!-- Return the result list -->
[h: debug("Exiting " + macroName + " with Result List: " + resultList)]
[h:macro.return=resultList]
