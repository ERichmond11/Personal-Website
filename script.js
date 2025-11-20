// future animations / click interactions here
console.log("script loaded");

// ---------------- LeetCode dropdown interactions ----------------
function toggleDropdown(id, button) {
  const list = document.getElementById(id);
  const allLists = document.querySelectorAll('.dropdown-content');
  const allButtons = document.querySelectorAll('.dropbtn');

  // close other dropdowns
  allLists.forEach(l => {
    if (l !== list) l.classList.remove('show');
  });
  allButtons.forEach(b => {
    if (b !== button) b.innerHTML = b.innerHTML.replace('▴', '▾');
  });

  // toggle current dropdown
  list.classList.toggle('show');
  button.innerHTML = list.classList.contains('show')
    ? button.innerHTML.replace('▾', '▴')
    : button.innerHTML.replace('▴', '▾');
}

//Brand images styling

function nextImage(arrow) {
    const img = arrow.parentElement.querySelector('.slider-img');
    const front = img.getAttribute('data-front');
    const back = img.getAttribute('data-back');

    img.src = img.src.includes(front) ? back : front;
}

function prevImage(arrow) {
    const img = arrow.parentElement.querySelector('.slider-img');
    const front = img.getAttribute('data-front');
    const back = img.getAttribute('data-back');

    img.src = img.src.includes(back) ? front : back;
}

const images = {
  black: ["images/BlackFront.PNG", "images/BlackBack.PNG"],
  white: ["images/WhiteFront.PNG", "images/WhiteBack.PNG"],
  green: ["images/GreenFront.PNG", "images/GreenBack.PNG"]
};

const indexTracker = {
  black: 0,
  white: 0,
  green: 0
};

function nextImage(color) {
  indexTracker[color] = (indexTracker[color] + 1) % images[color].length;
  document.getElementById(`${color}-img`).src = images[color][indexTracker[color]];
}

function prevImage(color) {
  indexTracker[color] =
    (indexTracker[color] - 1 + images[color].length) % images[color].length;
  document.getElementById(`${color}-img`).src = images[color][indexTracker[color]];
}



