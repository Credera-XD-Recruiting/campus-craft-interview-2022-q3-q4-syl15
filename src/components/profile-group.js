import { removeChildNodes } from "../utils";

const activityStates = {
  active: "active",
  inactive: "inactive",
  moderate: "moderate",
  low: "low",
};
/**
 * Function which generates a single Card node based on a dataset
 *
 * @param {object} data data containing attributes of a card
 * @return {Node} generated markup for a card
 */
const generateCardNode = (data) => {
  const { name, href, image, activity, favorite } = data;
  const templateId = "profile-group-results-item-template";
  const resultCardTemplate = document.getElementById(templateId);
  const clone = document.importNode(resultCardTemplate.content, true);
  const titleNode = clone.querySelector("p.page-paragraph");
  const referenceNode = clone.querySelector("a.profile-group-results-card");
  const groupImageNode = clone.querySelector(
    "a.profile-group-results-card img"
  );
  const cardNode = clone.querySelector("a.profile-group-results-card");

  let color = undefined;
  switch (activity) {
    case activityStates.active:
      color = "var(--secondary)"
    break;
    case activityStates.moderate:
      color = "var(--primary)"
    break;
    case activityStates.low:
      color = "var(--warning)"
    break;
    case activityStates.inactive:
      color = "var(--grayscale_2)"
    break;
    default:
      // do nothing
    break;
  }
  if (color !== undefined) {
    cardNode.style.backgroundColor = color;
  }

  if (favorite) {
    // cardNode.style.boxShadow = `0px 0px 10px 2px ${color}`;

    const star = document.createElement("img");
    star.src = "https://images.vexels.com/media/users/3/283648/isolated/lists/42ae2ba3fdb9dcea5b5884f4378b3c21-pink-rounded-star.png";
    star.setAttribute("aria-label", `star`);
    star.classList.add("profile-group-star");
    cardNode.appendChild(star);
  }

  titleNode.innerHTML = `${name}`;
  referenceNode.href = href;
  groupImageNode.src = image;

  return clone;
};

/**
 * Function which accepts the JSON results from the API, and uses HTML templates
 * to generate the markup needed for the results list
 *
 * @param {object} resultsData JSON payload of results
 */
export const generateProfileGroupItemsFromTemplate = (resultsData) => {
  const profileGroupsList = document.querySelector(
    "#profile-groups .profile-group-results"
  );

  removeChildNodes(profileGroupsList);

  if (resultsData.groups && resultsData.groups.length > 0) {
    for (let i = 0; i < resultsData.groups.length; i++) {
      const groupNode = generateCardNode(resultsData.groups[i]);
      profileGroupsList.appendChild(groupNode);
    }
  }
};
