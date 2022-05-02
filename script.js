
// let friendsContainer = $("[aira-label='All friends']");
// let betterFriendsContainer = $(".sxpk6l6v");
let moreButtons = $("div[aria-label='More']");
let popoverDiv = $("div")
let regex = RegExp(/Unfollow (\w+)/g)
let randDelay = function() {
  return Math.floor(Math.random() * 100)
}

function clickMore(el) {
    el.click();
    console.log("clicked");

    let unfollowed = false;
    popoverDiv.find("span").each((i, menuItem) => {
      if (!unfollowed && regex.test(menuItem.innerText)) {
        unfollowed = true;
        setTimeout(() => {
          clickUnfollow(menuItem);
        }, 400 + randDelay());
      }
    })
    if (!unfollowed) {
      //Click whatever div closes modals
    }
}

function clickUnfollow(el) {
  el.click();
  console.log("clicked: " + el.innerText);
}

const delayLoop = (fn, delay) => {
    return (i, element) => {
      setTimeout(() => {
        fn(element);
      }, i * (delay + randDelay()));
    }
  };
  
  moreButtons.each(delayLoop(clickMore, 1000));