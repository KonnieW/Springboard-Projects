const BASE_API_URL = "https://jservice.io/api/"; //This is the foundation url that will be used globally in all the functions
const NUM_CATEGORIES = 6;     //hardcode the size of the categories/clues so they don't show more than this on the screen
const NUM_CLUES_PER_CAT = 5;

let categories = [];   //empty array to push the data into


/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {
  // ask for 100 categories [most we can ask for], so we can pick random
  let response = await axios.get(`${BASE_API_URL}categories?count=100`); //using promises to retrieve API data, using base url and adding on specifics to give count of 100 categories 
  let catIds = response.data.map(c => c.id); //uses map to iterate through each object in the array of the 100 categories and convert them to IDs, implicit return
  return _.sampleSize(catIds, NUM_CATEGORIES);  //uses lodash to iterate the array data, samples a particular number of items from a larger liste; avoids duplicates. Randomizes the data. 
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */


async function getCategory(catId) { //goes through data from one ID category at a time
  let response = await axios.get(`${BASE_API_URL}category?id=${catId}`); //With the 6 given category IDs one at a time
  let cat = response.data; //Populates 5 arrays of all of the data from the categories based on the chosen ID  
  let allClues = cat.clues; //Populates 5 clue arrays from the category ID
  let randomClues = _.sampleSize(allClues, NUM_CLUES_PER_CAT); //using lodash again to randomize/sample the clues from allClues and choosing max 5
  let clues = randomClues.map(c => ({  //uses map to ierate through all the objects and transforms/pulls the question and answers from the array of 5
    question: c.question,
    answer: c.answer,
    showing: null,
  }));

  return { title: cat.title, clues }; //specify to get back the title along with the clues; otherwise will get more miscellaneous info
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
  // Add row with headers for categories
  $("#jeopardy thead").empty();  //After all clues and answers from 6 categories have been retrieved; selecting html jeopardy table to begin building
  let $tr = $("<tr>");           //creating table row in the table's thead
  for (let catIdx = 0; catIdx < NUM_CATEGORIES; catIdx++) { //looping over the table to create it based on number of categories (6)
    $tr.append($("<th>").text(categories[catIdx].title)); //appending table header cells to the table rows and the category titles
  }
  $("#jeopardy thead").append($tr); //appending table row (with the th's) to the thead

  // Add rows with questions for each category
  $("#jeopardy tbody").empty(); //same process as above but now in the main tbody
  for (let clueIdx = 0; clueIdx < NUM_CLUES_PER_CAT; clueIdx++) { //looping over the table to create it based on number of clues (5) 
    let $tr = $("<tr>"); //creates table row
    for (let catIdx = 0; catIdx < NUM_CATEGORIES; catIdx++) { //looping over the table to create it based on number of categories (6)
      $tr.append($("<td>").attr("id", `${catIdx}-${clueIdx}`).text("?"));
    }
    $("#jeopardy tbody").append($tr); 
  }
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
  let id = evt.target.id; //clicking on each box will trigger a click event; targets td table ids example: "0-0" upper top left square; recieved numbers from the fillTable function looping through
  let [catId, clueId] = id.split("-"); //split will give you an array of things that are separated by a space catId= "0", clueId="0"
  let clue = categories[catId].clues[clueId]; //clue (aka question) will appear 

  let msg; //msg = undefined

  if (!clue.showing) {  //If clue is not showing as a message
    msg = clue.question; //msg becomes a question
    clue.showing = "question"; //then show the question as a msg
  } else if (clue.showing === "question") { //if the question is showing
    msg = clue.answer; //msg becomes an answer
    clue.showing = "answer"; //then show the answer instead
  } else {
    // already showing answer; ignore
    return
  }

  // Update text of cell
  $(`#${catId}-${clueId}`).html(msg); //after going through the appropriate if statements update the cell
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
  let catIds = await getCategoryIds(); //waits for data from the getCategoryIds function as there is nothing on the table yet; should return 6 category IDs

  categories = [];        //waiting to get back category IDs from getCategoryIds function to be pushed in

  for (let catId of catIds) {
    categories.push(await getCategory(catId)); //loops through each of the 6 category IDs one at a time, and pushes the data into the empty array
  }

  fillTable(); //callback to fillTable to populate the board with the new data from the categories
}

/** On click of restart button, restart game. */

$("#restart").on("click", setupAndStart); //after setting the global codes at the top, jump down to the restart/start game click event

/** On page load, setup and start & add event handler for clicking clues */

$(async function () {
    setupAndStart();  //Callback to the setupAndStart function
    $("#jeopardy").on("click", "td", handleClick); //clicking on the data tables will invoke the catIds from getCategoryIds and get the IDs
  }
);
