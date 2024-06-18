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

let slug = 'are-natv';
let page = 1; // Initialize the page number
let totalPages = 1; // Initialize total pages

window.onload = function() {
  // Initial renering
  renderTitle(slug);
  fetchTotalPages(slug).then(() => {
    renderChannel(slug, page);
    createPaginationButtons();
    updateButtons();
  });
}

// function handleScroll() {
//   let isScrollAtBottom = (window.pageYOffset + window.innerHeight + 10 > document.body.scrollHeight);

//   if (isScrollAtBottom) {
//     page++;
//     renderChannel(slug, page);
//   }
//   console.log(page);
// }

// window.addEventListener('scroll', handleScroll);
// window.addEventListener('touchmove', handleScroll);


document.getElementById('nextPageButton').addEventListener('click', function() {
  if (page < totalPages) {
    page++;
    renderChannel(slug, page);
    updateButtons();
  }
});

document.getElementById('prevPageButton').addEventListener('click', function() {
  if (page > 1) {
    page--;
    renderChannel(slug, page);
    updateButtons();
  }
});

function updateButtons() {
  document.getElementById('prevPageButton').disabled = (page === 1);
  document.getElementById('nextPageButton').disabled = (page === totalPages);

  const button = document.querySelectorAll('.pagination-buttons input[type="radio"]');
  buttons.forEach(radio => {
    button.checked = (parseInt(radio.value) === page);
    button.disabled = (parseInt(radio.value) === page);
  });

  // const buttons = document.querySelectorAll('.pagination-buttons button');
  // buttons.forEach(button => {
  //   button.disabled = (parseInt(button.textContent) === page);
  // });
}


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

function createPaginationButtons() {
  const paginationContainer = document.querySelector('.pagination-buttons');
  paginationContainer.innerHTML = ''; // Clear existing buttons

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.addEventListener('click', function() {
      page = i;
      renderChannel(slug, page);
      updateButtons();
    });
    paginationContainer.appendChild(button);
  }

  updateButtons();
}

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
                    return `<strong class="Block__title">${block.title}</strong>`;
                  }

                  return ``;
                })()}


                ${(() => {
                  // Return a different bit of HTML, depending on what type of block it is
                  switch (block.class) {

                    case "Image":
                      return `
                      <a href="https://www.are.na/block/${block.id}" class="BlockInner__Link">
                        <img class="BlockInner__Image" src="${block.image.large.url}"/>
                      </a>
                      <a href="https://www.are.na/block/${block.id}">
                        <p style="text-align: center; text-transform: uppercase;">
                        ${block.title}
                      </p></a>
                      `;
                      
                    case "Text":
                      return `
                      <audio autoplay loop src="./sound/tvnoise.mp3"></audio>
                      <img class="BlockInner__Image" style="z-index:-1;" src="img/noise.gif">
                      <p class="BlockInner__Text">${block.content}</p>
                      `;

                    case "Attachment":
                      return `
                      <video class="BlockInner__Video" autoplay loop src="${block.attachment.url}"></video>
                      <img class="BlockInner__Image" style="z-index:-1;" src="img/noise2.gif">
                      `;
                
                    case "Link":
                      return `
                      <a href="${block.source && block.source.url}" class="BlockInner__Link">
                        <img class="BlockInner__Image" src="${block.image.large.url}"/>
                      </a>
                      <a href="https://www.are.na/block/${block.id}"><p style="text-align: center; text-transform: uppercase;">
                        ${block.title}
                      </p></a>
                      `;
                      
                    case "Media":
                      return `
                      <img class="BlockInner__Image" src="${block.image.large.url}"/>
                      `;
                      
                    case "Channel":
                      return `
                      `;
                  }
                })()}
              </div>
            `;
          }).join("")}`;
    
    let contents = document.getElementsByClassName("ChannelContents")[0];
    contents.innerHTML = elements; // Clear existing content and add new content
    // contents.insertAdjacentHTML("beforeend", elements);
  })
}
