import { removeChildNodes } from "../utils";

/**
 * Function which generates a single list-item node based on a dataset
 *
 * @param {object} data data containing attributes of a listItem
 * @return {Node} generated markup for a card
 */
const generateListItemNode = (data) => {
  const { avatarSrc, name, jobTitle, companyName, topFriend } = data;
  const templateId = "friend-list-item-template";
  const resultCardTemplate = document.getElementById(templateId);
  const clone = document.importNode(resultCardTemplate.content, true);
  const topFriendNode = clone.querySelector("p.top-friend-flag");
  const nameNode = clone.querySelector("p.page-paragraph");
  const titleNode = clone.querySelector("p.page-micro");
  const avatarNode = clone.querySelector(".profile-list-item-avatar");

  if (topFriend) {
    topFriendNode.classList.add("top-friend-flag-visible");
  }
  nameNode.innerHTML = `${name}`;
  titleNode.innerHTML = `${jobTitle} @ ${companyName}`;
  avatarNode.src = avatarSrc;
  avatarNode.setAttribute("aria-label", `${name}`);

  if (avatarSrc) {
    const avatarImg = document.createElement("img");
    avatarImg.src = avatarSrc;
    avatarImg.setAttribute("aria-label", `${name}`);
    avatarNode.appendChild(avatarImg);
  } else {
    avatarNode.classList.add("profile-list-item-avatar-initials");
    const firstInitial = name.split(" ")[0][0];
    const secondInitial = name.split(" ")[1][0];
    const initials = `${firstInitial}${secondInitial}`;
    avatarNode.innerHTML = initials;
  }

  return clone;
};

/**
 * Function which accepts the JSON results from the API, and uses HTML templates
 * to generate the markup needed for the results list
 *
 * @param {object} resultsData JSON payload of results
 */
export const generateFriendsListFromTemplate = (resultsData) => {
  const friendsListSection = document.querySelector(
    "#profile-friends .profile-friends-list"
  );

  if (resultsData.friends && resultsData.friends.length > 0) {
    removeChildNodes(friendsListSection);

    resultsData.friends.sort((a, b) => {
      const aLast = a.name.split(" ")[1];
      const bLast = b.name.split(" ")[1];

      // top friends should always get precedence
      if (a.topFriend && !(b.topFriend)) {
        return -1;
      }
      if (!a.topFriend && b.topFriend) {
        return 1;
      }
      if (a.topFriend && b.topFriend) {
        return 0;
      }
      // else, sort alphabetically
      if (aLast > bLast) {
        return 1;
      } 
      if (aLast < bLast) {
        return -1;
      }
      // else, they're equal
      return 0;
    });
    console.log(resultsData.friends);

    for (let i = 0; i < resultsData.friends.length; i++) {
      const friendsNode = generateListItemNode(resultsData.friends[i]);
      friendsListSection.appendChild(friendsNode);
    }
  }
};
