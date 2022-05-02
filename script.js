
// let friendsContainer = $("[aira-label='All friends']");
// let betterFriendsContainer = $(".sxpk6l6v");
let evenBetterSelector = $("div[aria-label='More']");
let popoverDiv = $("div")
// evenBetterSelector.forEach((child) => {
//     child.click();
// })

function clickMore(el) {
    el.click();
    console.log("clicked");

    popoverDiv.find("span")
}

function clickUnfollow(el) {
    
}

const delayLoop = (fn, delay) => {
    return (i, element) => {
      setTimeout(() => {
        fn(element);
      }, i * delay);
    }
  };
  
  evenBetterSelector.each(delayLoop(clickMore, 1000));