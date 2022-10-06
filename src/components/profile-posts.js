import { removeChildNodes } from "../utils";

var showMoreEnabled = false;

/**
 * Function which generates a single Card node based on a dataset
 *
 * @param {object} data data containing attributes of a card
 * @return {Node} generated markup for a card
 */
const generateCardNode = (data) => {
  const {
    authorFirstName,
    authorLastName,
    authorAvatarSrc,
    jobTitle,
    companyName,
    post,
    // captured publishDate, state, city
    publishDate, 
    state, 
    city
  } = data;
  console.log(data); 
  const templateId = "profile-post-item-template";
  const resultCardTemplate = document.getElementById(templateId);
  const clone = document.importNode(resultCardTemplate.content, true);
  const authorName = clone.querySelector(".post-author-info .page-paragraph");
  const jobDesc = clone.querySelector(".post-author-info .page-micro");
  const postNode = clone.querySelector(".post-content");
  const avatarNode = clone.querySelector(".post-author-avatar");
  const contentCard = clone.querySelector(".content-card");
  // date, city, state
  const postInfo = document.createElement("p");
  postInfo.classList.add("post-publication-info");
  const postInfoNode = clone.querySelector(".post-author-info");
  postInfoNode.appendChild(postInfo);

  authorName.innerHTML = `${authorFirstName} ${authorLastName}`;
  jobDesc.innerHTML = `${jobTitle} @ ${companyName}`;
  const publishDateObject = new Date(publishDate);
  const formattedDate = publishDateObject.toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"}) 
  postInfo.innerHTML = `${formattedDate} • ${city} , ${state}`;

  const showMore = document.createElement("button");
  showMore.innerText = "Show more";
  showMore.classList.add("show-more-button");

  const shortenedPost = post.split(".")[0] + "...";
  postNode.innerHTML = shortenedPost;

  showMore.onclick = () => { 
    if (showMoreEnabled) {
      showMore.innerText = "Show more";
      postNode.innerHTML = shortenedPost;
    } else {
      postNode.innerHTML = post;
      showMore.innerText = "Show less";
    }
    showMoreEnabled = !showMoreEnabled 
  };

  contentCard.appendChild(showMore);


  if (authorAvatarSrc) {
    const avatarImg = document.createElement("img");
    avatarImg.src = authorAvatarSrc;
    avatarImg.setAttribute(
      "aria-label",
      `${authorFirstName} ${authorLastName}`
    );
    avatarNode.appendChild(avatarImg);
  }

  return clone;
};

/**
 * Function which accepts the JSON results from the API, and uses HTML templates
 * to generate the markup needed for the results list
 *
 * @param {object} resultsData JSON payload of results
 */
export const generatePinnedPostsFromTemplate = (resultsData) => {
  const pinnedPostsList = document.querySelector(
    "#profile-posts .profile-post-results"
  );

  removeChildNodes(pinnedPostsList);

  if (resultsData.pinnedPost) {
    const postNode = generateCardNode(resultsData.pinnedPost);
    pinnedPostsList.appendChild(postNode);
  }
};
