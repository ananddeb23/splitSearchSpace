function saveOptions(e) {
  if(document.querySelector("#id_new").checked) {
    browser.storage.sync.set({
      tab_style: 'new'
    }).then(() => {
      document.querySelector(".result").innerHTML = 'View has been set to - "parallel"';
    });
  }else if(document.querySelector("#id_split").checked){
    browser.storage.sync.set({
      tab_style: 'split'
    }).then(() => {
      document.querySelector(".result").innerHTML = 'View has been set to - "split"';
    });
  }
  e.preventDefault();
}

function restoreOptions() {
  const gettingItem = browser.storage.sync.get('tab_style');
  gettingItem.then((res) => {
    const result = res.tab_style;
    if(result === 'new'){
      document.querySelector("#id_new").checked = true;
    } else {
      document.querySelector("#id_split").checked = true;
    }
  }).catch(() => {
    document.querySelector("#id_split").checked = true;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);