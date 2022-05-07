// Constants
const popoverDiv = $("body > div > div > div:nth-child(1) > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div > div:nth-child(2)") // selects the div 
const regex = RegExp(/Unfollow (\w+)/g) // Matches "Unfollow *****"

// Helper Functions
let randDelay = () => Math.floor(Math.random() * 100) // Helper function that generates random 100ms delays
let sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms)); // Helper function that sleeps for a ms
// Helper Function that loops on a delay
let delayLoop = (fn, delay) => {
  return (i, element) => {
    setTimeout(() => {
      fn(element);
    }, i * (delay + randDelay()));
  }
};

async function unfollower() {
  let moreButtons = $("div[aria-label='More']");
  let updateButtons = () => {moreButtons = $("div[aria-label='More']")} //selects all the ... buttons
  for (i = 0; i < moreButtons.length; i++) {
    
  }
}

async function clickMore(el) {
  let unfollowed = false;
  let foundButtons = [];

  // console.log("Calling ClickMore")
  el.scrollIntoView({behavior: "smooth", block: "center"})
  el.click();
  // console.log("clicked three dots")

  await sleep(1000) // Wait until DOM updates

  // console.log("sleep Finished: ", popoverDiv.find("span"));

  popoverDiv.find("span").each((i, menuItem) => {
    // console.log("Testing: " + menuItem.innerText, " -> ", regex.test(menuItem.innerText))
    // console.log(regex.test(menuItem.innerText))
    if (regex.test(menuItem.innerText)) {
      console.log("Found ", menuItem.innerText, " unfollowing...")
      foundButtons.push(menuItem)
      unfollowed = true;
      // console.log("Found Buttons: ", foundButtons);
      // console.log("unfollowed: ", unfollowed);
    }
  })
  if (!unfollowed) {
    console.log("no unfollow text found");
    el.click(); //close Modals
  }
  
  // console.log("Setting Timeout");
  let toDo = () => {
    console.log("Clicking these Buttons: ", foundButtons)
    clickUnfollow(foundButtons);
  }
  setTimeout(toDo, 1000 + randDelay());
}

function clickUnfollow(elements) {
  elements.forEach((el) => {
    el.click();
    console.log("clicked: " + el.innerText);
  })
}

// Run  
unfollower();
