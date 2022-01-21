function saveOptions(e) {
  var x = document.getElementById("whitelist").value
  alert(x)
  if (!isWhitelisted(e)){
    localStorage.setItem(localStorage.length, e)
  }
  else{
    alert("Already whitelisted")
  }
}

function isWhitelisted(site){
  for (let i = 0; i < localStorage.length; i++){
    if (site.toLowerCase() == localStorage[i].toLowerCase){
      return true
    }
  }
  return false;
}

document.getElementById("saveWhite").addEventListener("click", saveOptions());
changeInput()