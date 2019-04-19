# Lab 9

Your Lab 9 repository should include all you relevant files (and folders) from Lab 8.  In other words I should be able to clone the repository, run your server, and test your results without any extra steps other than copying in `credentials.json`. You could accomplish this by forking your Lab 8 repo or using [these nifty techniques](https://help.github.com/en/articles/duplicating-a-repository) to duplicate your Lab 8 repository (either the first or third option on that page would work for you). 

Be certain that the user `mcphee@146.57.33.%` has the appropriate privileges to execute all of the SQL commands used by your code.

Now it is it time to finish off this register project.  As you implement the functionality below, remember that your primary mode of interaction is through your REST interface.

* Add a login/logout function.  If no user is logged in, then no till buttons should be useable (you can make them invisible, or just not operational.)  Use whatever technique you would like.  Be sure to document this in your manual (discussed at the end of this lab.)
* Think about what it would take to write a procedure (or trigger) that would identify DEALS in the current `till_items` and update your table to reflect the new pricing.  Talk it over with your partners until you are convinced that you understand what needs to be done... then relax and congratulate yourselves on a job well done.
*  Modify your click API entry so the time stamp of a button is also recorded.
* Add REST handlers to deal with SALE and VOID.  You can decide whether or not to use `till_buttons` or hard-code the buttons into your angular template.  Produce your logic and button accordingly:

   * Add a **void** button that will erase all the curent contents in the register, 
   * Add a **sale** button.  (more on this below)

* Clicking on **sale** should implement special functionality that copies the till_items to a special archive (you will have to make an archive table).  The archive table should have a new field called transactionID and user.  (This is breaking some of the rules of normalization... be prepared to tell me in person what the poetential problems are and the proper way to fix them).  You can achieve this functionality however you like as long as it occurs on the DBF server.  Both procedures and triggers are viable options.  Be sure that your *sale* functionality adds an entry in the archive denoting the clicking of the sale button.
* Clicking on **void** does not have to add an entry in the archive (although you can do so if you like as long as such entries can be clearly identfied as voided transactions)
* Create a a view called `transactionSummary` that summarizes the transactions in the archive table.  It should show:

```
|field        | Description                                         |
|-------------|-----------------------------------------------------|
|transactionID| The transaction ID on which you will be grouping    |
|startTime    | earliest time stamp of a button in that transaction |
|stopTime     | latest time stamp of a button in that transaction   |
|duration     | difference in seconds of stopTime and startTime     |
|user         | user's name                                         |
|total        | total amount in sale                                |
```

* EITHER
   * Add a TICKETIZE option to your API that calls a suitably modified `ticketize` function (on the DBF side) to generate a JSON object that would, presumably, be used by a function to print out the receipt
   * Add javascript to your HTML template that pops up a suitable "receipt"
* Finally, you should expand your API document into a complete user manual (preferably with a few screen shots).  Make the API details into an appendix at the end.  (Don't go crazy on this step... but don't just gloss over it either...)
