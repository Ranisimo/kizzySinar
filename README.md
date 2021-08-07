# kizzySinar
ITCareerSwitch Projects

##Task

For this project, I was given a code example geonamesExample to follow and refer to. I mostly used it to analyse the php files and js ajax syntax to ensure that I understood how the code ran and how to implement it into my own code.
I chose three APIs from geonames.org that I felt were interesting: earthquakes, weather, and wikipediaSearch.
They provided me a challenge at first as I tried to understand the parameters and format of the html and how to request the parts of data I needed for the search parameters.


**Some changes I'd make for future projects:**
Earthquakes, Weather, and WikipediaSearch all produce 10 rows of data (configured by maxRows which unless modified, 10 is the default), which I only utilise the first array ([0]). I could either include the maxRows into the query and set it to 1, or I could implement a way to view all 10 rows or other custom amounts. While simple to do, it would time consuming to write the code necessary to display the rows. *Essentially a lot of copy and pasting different html IDs*.

While wikipediaSearch was straight forward enough, and only required one parameter, the other two were more specific with needing north, south, east, and west to produce a bounding box. This also meant values such as 0,0,0,0 produced no data because the bounding box contained nothing - *both because the bounding box was effecitvely null, and because there were no earthquakes or weather reports contained within the bounding box.* As brifiely mentioned, sometimes certain bounding box queries produced no results, not because the bounding box was invalid, but because there was no data retrieved. So leaving the inputs open and freely changeable by the user means that nothing may get displayed. To counter this, I could've included more of a detailed explanation what each input value would do and perhaps provide a series of inputs that worked and produced results, so while testing the code the user could change the values to the different ones provided and see the differing results. However, for the purpose of this task, this was an unecessary extra step, and providing working inputs preset provided enough to test with.
