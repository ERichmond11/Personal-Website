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

