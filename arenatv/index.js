// =============================================================
// Open: TV Popup
// =============================================================

let popupWin;
    
function openWin(URL, title, popupW, popupH) {
  let top = (window.innerHeight - popupH) / 2;
  let left = (window.innerWidth - popupW) / 2;
  // let top = (screen.height - popupH) / 2;
  // let left = (screen.width - popupW) / 2;
  let popupWin = window.open(URL, title,'resizable=no, width=' + popupW + ', height=' + popupH + ', top=' + top + ', left=' + left);
}


// =============================================================
// API
// =============================================================

let slug = 'are-natv';
let page = 1; // Initialize the page number
let totalPages = 1; // Initialize total pages
let buttonsPerPage = 5;

window.onload = function() {
  renderTitle(slug);
  fetchTotalPages(slug).then(() => {
    renderChannel(slug, page);
  });
}


// =============================================================
// API: Basic
// =============================================================

function renderTitle(slug) {
  // Fetch the channel title from the Are.na API
  let url = `https://api.are.na/v2/channels/${slug}/collaborators`;

  fetch(url)
    .then(response => response.json())
    .then(data => document.title = data.channel_title);
}

function fetchTotalPages(slug) {
  let url = `https://api.are.na/v2/channels/${slug}`;
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      let totalContents = data.length; // Get total contents
      let per = 1; // Number of contents per page
      totalPages = Math.ceil(totalContents / per); // Calculate total pages
    });
}


// =============================================================
// API: Content
// =============================================================

function renderChannel(slug, page) {
  // Add a loading message
  // let loading = `Loading...`;
  // document.body.innerHTML = loading;      

  // Fetch the channel data from the Are.na API
  let time = Date.now();
  let per = 1;
  let url = `https://api.are.na/v2/channels/${slug}/contents?t=${time}&direction=desc&sort=position&page=${page}&per=${per}`;


  fetch(url, {cache: 'no-cache'})
    .then(response => response.json())
    .then(channel => {

      // Channel Info
      // document.body.innerHTML = `
      let elements = `${channel.contents.map(block => {


            // We are going to return HTML, mixed in with the data from the block.
            return `
              <div class="Block ${block.class}">

                ${(() => {
                  if (block.title && block.class !== 'Link' && block.class !== 'Channel') {
                    return `
                    <a href="https://www.are.na/${block.connected_by_user_slug}">
                    <p class="Block_log">${block.connected_by_username}${block.title}</p>
                    </a>
                    `;
                  }

                  return ``;
                })()}


                ${(() => {
                  // Return a different bit of HTML, depending on what type of block it is
                  switch (block.class) {

                    case "Image":
                      return `
                      
                      `;
                      
                    case "Text":
                      return `
                      
                      `;

                    case "Attachment":
                      return `
                      
                      `;
                
                    case "Link":
                      return `
                      
                      `;
                      
                    case "Media":
                      return `
                      
                      `;
                      
                    case "Channel":
                      return `

                      `;
                  }
                })()}
              </div>
            `;
          }).join("")}`;
    
    let contents = document.getElementsByClassName("ARENA-container")[0];
    contents.innerHTML = elements; // Clear existing content and add new content
  })
}



//   "id": 76969,
//   "title": "The Working Sheepdog ( Border Collies ) in training",
//   "updated_at": "2020-04-07T21:59:29.806Z",
//   "created_at": "2013-02-12T22:40:15.696Z",
//   "state": "available",
//   "comment_count": 0,
//   "generated_title": "The Working Sheepdog ( Border Collies ) in training",
//   "content_html": "",
//   "description_html": "<p>Border Collie Collies working sheepdog Sheep dogs in training Scotland</p>",
//   "visibility": "public",
//   "content": "",
//   "description": "Border Collie Collies working sheepdog Sheep dogs in training Scotland",
//   "source": {},
//   "image": {},
//   "embed": {},
//   "attachment": null,
//   "metadata": null,
//   "base_class": "Block",
//   "class": "Media",
//   "user": {},
//   "position": 1,
//   "selected": false,
//   "connection_id": 716562,
//   "connected_at": "2016-05-16T00:59:42.901Z",
//   "connected_by_user_id": 128,
//   "connected_by_username": "Chris Sherrón",
//   "connected_by_user_slug": "chris-sherron"