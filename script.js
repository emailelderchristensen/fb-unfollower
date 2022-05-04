
let moreButtons = $("div[aria-label='More']");
let popoverDiv = $("body > div > div > div:nth-child(1) > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div > div:nth-child(2)")
let regex = RegExp(/Unfollow (\w+)/g)
let randDelay = function() {
  return Math.floor(Math.random() * 100)
}

function clickMore(el) {
    console.log("Calling ClickMore")
    el.click();
    console.log("clicked three dots");

    let unfollowed = false;
    let foundButtons = [];
  
    console.log(popoverDiv.find("span"));
    popoverDiv.find("span").each((i, menuItem) => {
      console.log("Testing: " + menuItem.innerText)
      if (!unfollowed && regex.test(menuItem.innerText)) {
        unfollowed = true;   
      }
    })
    if (!unfollowed) {
      console.log("no unfollow text found");
    }
    console.log("Setting Timeout");
    let toDo = () => {
      console.log("Clicking these Buttons: ", foundButtons)
      clickUnfollow(foundButtons);
      el.click() //closeModals
    }
    setTimeout(toDo, 400 + randDelay());
}

function clickUnfollow(elements) {
  elements.forEach((el) => {
    el.click();
    console.log("clicked: " + el.innerText);
  })
}

const delayLoop = (fn, delay) => {
    return (i, element) => {
      setTimeout(() => {
        fn(element);
      }, i * (delay + randDelay()));
    }
  };
  
  moreButtons.each(delayLoop(clickMore, 20000));
