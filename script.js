// Constants
const popoverDiv = $("body > div > div > div:nth-child(1) > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div > div:nth-child(2)") // selects the div 
const regex = RegExp(/Unfollow (\w+)/g) // Matches "Unfollow *****"
const friends = $("body > div > div > div:nth-child(1) > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div > div.j83agx80.cbu4d94t.d6urw2fd.dp1hu0rb.l9j0dhe7.du4w35lb > div.rq0escxv.pfnyh3mw.jifvfom9.gs1a9yip.owycx6da.btwxx1t3.j83agx80.buofh1pr.dp1hu0rb.l9j0dhe7.du4w35lb.ka73uehy > div.rq0escxv.l9j0dhe7.j83agx80.cbu4d94t.d2edcug0.hpfvmrgz.pfnyh3mw.dp1hu0rb.rek2kq2y.o36gj0jk.tkr6xdv7 > div > div.rpm2j7zs.k7i0oixp.gvuykj2m.j83agx80.cbu4d94t.ni8dbmo4.du4w35lb.q5bimw55.ofs802cu.pohlnb88.dkue75c7.mb9wzai9.d8ncny3e.buofh1pr.g5gj957u.tgvbjcpo.l56l04vs.r57mb794.kh7kg01d.eg9m0zos.c3g1iek1.l9j0dhe7.k4xni2cv > div.j83agx80.cbu4d94t.buofh1pr.l9j0dhe7 > div.aov4n071 > div > div.rtmu0sqt.qzhwtbm6 > div > div > div > div > div > h2 > span > span")
const friendsRegex = RegExp(/([\d]+,[\d]+) friends/g) // Matches "123 friends"
// Helper Functions
let randDelay = () => Math.floor(Math.random() * 100) // Helper function that generates random 100ms delays
let sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms)); // Helper function that sleeps for a ms
function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}
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
  let numberOfFriends = parseInt(friendsRegex.exec(friends.text())[1].replace(',',''))
  let i = 0;
  console.log(numberOfFriends);
  while(i < numberOfFriends) {
    console.log("Looping!")
    if (moreButtons.length > i) {
      let el = moreButtons[i];
      let unfollowed = false;
      await clickMore(el);
      await sleep(randDelay());
      await clickUnfollow(findMenuItems(el));
      console.log("On friend ", i);
      i++;
    } else {
      moreButtons[i - 20]
      .scrollIntoView({behavior: "smooth", block: "center"});
      await sleep(1000 + randDelay());
      moreButtons[i - 1]
      .scrollIntoView({behavior: "smooth", block: "center"}) //scroll the user to the center
    }
    await sleep(500 + randDelay());
    updateButtons();
    console.log("Looped: ", i, " times");
  }
  return "Done!"
}

async function clickMore(el) {
  el.scrollIntoView({behavior: "smooth", block: "center"}) //scroll the user to the center
  el.click();

  await sleep(500) // Wait until DOM updates, janky I know
}

function findMenuItems(el) {
  let successfulUnfollow = false;
  let foundButtons = [];
  popoverDiv.find("span").each((i, menuItem) => {
    if (regex.test(menuItem.innerText)) {
      console.log("Found ", menuItem.innerText, " unfollowing...")
      foundButtons.push(menuItem)
      successfulUnfollow = true;
    }
  })
  if (!successfulUnfollow) {
    console.log("no unfollow text found");
    el.click(); //close Modals
  }
  return foundButtons;
}

async function clickUnfollow(elements) {


  elements.forEach(async (el, i) => {
    await sleep(400 * i + randDelay())
    el.click();
    console.log("Clicked: " + el.innerText);
  })
}

// Run  
unfollower();
