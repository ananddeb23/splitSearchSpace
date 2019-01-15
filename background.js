
// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
  function(text) {
    // Encode user input for special characters , / ? : @ & = + $ #
    const splitURL = 'http://dualsearch1.atwebpages.com/?search=' + interpolateSpaces(encodeURIComponent(text));
    const searchQuery =  interpolateSpaces(encodeURIComponent(text));
    const preTemplateG = 'https://www.google.com/search?q=';
    const urlG = `${preTemplateG}${searchQuery}`;
    const preTemplateC = 'http://search.carrot2.org/stable/search?query=';
    const urlC = `${preTemplateC}${searchQuery}`;

    browser.storage.sync.get('tab_style').then((res) => {
      // browser.sidebarAction.close();
      if(res.tab_style === 'new') {
        chrome.tabs.update(null, { url: urlC, active: true })
        chrome.tabs.create({ url: urlG });    
      } else {
        chrome.tabs.update(null, { url: splitURL })
      }
    })
  });

  function handleClick() {
    browser.runtime.openOptionsPage();
  }
  
  function interpolateSpaces(str) {
    return str.replace(/\s+/g,'+');
  }

  browser.browserAction.onClicked.addListener(handleClick);
