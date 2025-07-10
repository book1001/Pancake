async function load(url) {
  let result = await fetch(url);
  readText(await result.text());

  let result2 = await fetch(url);
  readText2(await result2.text());

  let result3 = await fetch(url);
  readText3(await result3.text());
}



function readText(text) {
  let contents = splitText(text);
  let content = contents[Math.floor(Math.random() * contents.length)];
  let randomContent = ("█" + content + "█").repeat(100).trim();

  let scutsHeight = ['200px','300px','400px'];
  let randomHeight = Math.floor(Math.random() * scutsHeight.length);
  let selectedHeight = scutsHeight[randomHeight];

  let innerHtml = createHtml(randomContent);

  // let contents = splitText(text);
  // let innerHtml = createHtml(contents);

  let shortcuts = document.getElementById("shortcuts-text");
  shortcuts.style.height = selectedHeight;
  shortcuts.innerHTML = innerHtml;

  // console.log(shortcuts);
}

function readText2(text) {
  let contents2 = splitText(text);
  let content = contents2[Math.floor(Math.random() * contents2.length)];
  let randomContent2 = (" █ " + content + " █ ").repeat(100).trim();

  let scutsHeight = ['200px','300px','400px'];
  let randomHeight = Math.floor(Math.random() * scutsHeight.length);
  let selectedHeight = scutsHeight[randomHeight];

  let innerHtml2 = createHtml(randomContent2);

  let shortcuts2 = document.getElementById("shortcuts-text2");
  shortcuts2.style.height = selectedHeight;
  shortcuts2.innerHTML = innerHtml2;
}

function readText3(text) {
  let contents3 = splitText(text);
  let content = contents3[Math.floor(Math.random() * contents3.length)];
  let randomContent3 = (" █ " + content + " █ ").repeat(100).trim();

  let scutsHeight = ['200px','300px','400px'];
  let randomHeight = Math.floor(Math.random() * scutsHeight.length);
  let selectedHeight = scutsHeight[randomHeight];

  let innerHtml3 = createHtml(randomContent3);

  let shortcuts3 = document.getElementById("shortcuts-text3");
  shortcuts3.style.height = selectedHeight;
  shortcuts3.innerHTML = innerHtml3;
}


function splitText(text) {
  if(text.includes("\r\n")) {     // for windows
      return text.split("\r\n")
  }
  else if(text.includes("\r")) {       // for mac
      return text.split("\r");
  }
  else if(text.includes("\n")) {       // for unix
      return text.split("\n");
  }
  return text;
}


function createHtml(contents) {
  let html = "";
  for(let i=0; i<contents.length; i++) {
      let line = contents[i];
      if(i == 0) {                                    // if first line
          line = line + " | "
      }
      // else if(line.includes("Oil") ||          // if line contains (Oil, Plaster, Bronze)
      //         line.includes("Walnut") ||
      //         line.includes("Bronze")) {
      //     line = " | " + line + "<br><br>";
      // }
      html += line + " ";
  }
  return contents;
}

function createHtml2(contents2) {
  let html = "";
  for(let i=0; i<contents2.length; i++) {
      let line = contents2[i];
      if(i == 0) { 
          line = line + " | "
      }
      html += line + " ";
  }
  return contents2;
}

function createHtml3(contents3) {
  let html = "";
  for(let i=0; i<contents3.length; i++) {
      let line = contents3[i];
      if(i == 0) { 
          line = line + " | "
      }
      html += line + " ";
  }
  return contents3;
}

window.onload = function() {
  load('../text.txt');
}
