const url = 'https://api.github.com/users/'
const searchBox = document.getElementById('searchBox')

  const getUser = async function (username) {
  // fectch user details
  const response = await fetch(url + username)
  const data = await response.json()

  const main = document.getElementById('main')

  const container = `
<div id="container" >

   <div class="card">
        <!-- profile    -->
     <div id="profile">   
       <div id="header">
         
          <div id="imageDiv">
            <img id="image" src="${data.avatar_url}" alt="">

         
                <div style="align-self:center">
                    <p id="userid">${data.login}</p>
                    <p id="location">${data.location}</p>
                    <p id="joining">${data.created_at}</p>
                 </div>
                 
           

            <!-- additional information -->
            <div id="additionalInfo" >
                  <div id="followers">Followers: ${data.followers}</div>
                  <div id="following">Following: ${data.following}</div>
                  <div id="public_repos">Reposetaries: ${data.public_repos}</div>
            </div>

            
            </div>
            <p class="username_font">${data.name}</p>
            <!-- bio -->
                <div id="bio">
                  <p>${data.bio}</p>
                </div> 
            
      </div>
   </div>    
    
    <div class=line></div>
    <div id="repos"></div>
    
  </div>

</div>`

  main.innerHTML = container

  getrepo(username)
}


// Get the form element by its ID
const formElement = document.querySelector("#form");

// Define the form submission event handler
const formSubmit = (event) => {
  event.preventDefault(); // Prevents the form from submitting the traditional way

  const userInput = document.querySelector("#searchBox");
  const text = userInput.value;
  const username = text.trim();
  if (username !== "") {
    // Call your function to handle the user input
    getUser(username);
  }

  userInput.value = '';
};
// Attach the event handler to the form's submit event
formElement.addEventListener("submit", formSubmit);

// fectch repository append to repository element
async function getrepo(username) {

  const repository = document.getElementById('repos')
  const repoResponse = await fetch(url + username + '/repos')
  const data1 = await repoResponse.json()
  data1.forEach((item) => {
    const element = document.createElement('a');
    //below process can be done by anchor tag object property
    // const a = document.createAttribute('href')
    // a.value = item.html_url;
    // element.setAttributeNode(a);
    element.classList.add('repo')
    element.href = item.html_url
    element.target = "_blank"
    element.innerHTML = item.name;
    repository.appendChild(element);

  });
}

//  The focusout event occurs when an element loses focus
searchBox.addEventListener("focusout", formSubmit)