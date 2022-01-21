



let observer = new MutationObserver(callback);
observer.observe(document, {attributes: false, childList: true, characterData: false, subtree:true});

checkSidebar();

function reload(){
    var allPosts = document.querySelectorAll("[data-testid='post-container']");
    for (var post of allPosts){
        console.log(post)
        if (post.style.display != "none"){
            var subpost;
            if (post.childNodes.length == 2){ //Text Posts
                subpost = post.childNodes[1].childNodes[0].childNodes[0]
            }

            else if (post.childNodes.length == 3) { //Picture posts & pinned
                if (post.childNodes[2].childNodes[0].textContent == "pinned by moderators"){ //Checks for pinned posts
                    if (post.childNodes[2].childNodes[2].childNodes[1].childNodes[1].textContent.includes("nsfw")){
                        hide(post)
                    }
                }
                else{
                    subpost = post.childNodes[2]
                }
            }

            if (subpost != undefined){
                if (subpost.style.display != "none"){ //In case it's already hidden
                    if (subpost.childNodes[1].childNodes[2].textContent.includes("nsfw") || 
                    subpost.childNodes[1].childNodes[1].childNodes[1].textContent.includes("nsfw")
                    ){
                        hide(post)
                        hide(subpost)
                    }
                }       
            }
        }
    }
}

function hide(post){ //Hides the divs
    console.log("hidden: " + post)
    post.style.display = "none"
    post.parentNode.parentNode.style.display = "none"
}

function callback(mutations) { //Adds an observer to DOM, whenever changes are detected, it refreshes the script
    reload();
}

function checkSidebar(){
    var sidebar = document.querySelector("[data-testid='subreddit-sidebar']");
    if (sidebar.childNodes[0].childNodes[1].childNodes[4].childNodes[0].textContent.includes("nsfw")){
        window.location.replace("http://reddit.com/r/NoFap");
    }
}
