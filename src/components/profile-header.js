import underlineSrc from "../assets/underline.svg";

export const updateProfileInformation = (data) => {
  const { firstName, lastName, avatarSrc } = data;
  const headerNode = document.querySelector("#profile-header .profile-header");
  const profileAvatarDiv = headerNode.querySelector(".profile-avatar");
  const profileAvatarNode = headerNode.querySelector("img");
  const nameNode = headerNode.querySelector(".profile-info .profile-info-name");
  const underlineNode = headerNode.querySelector(".profile-underline");

  underlineNode.setAttribute("src", underlineSrc);

  nameNode.classList.remove(
    "loading",
    "skeleton-block",
    "skeleton-block--half"
  );

  nameNode.innerHTML = `${firstName} ${lastName}`;
  nameNode.appendChild(underlineNode);
  profileAvatarNode.src = avatarSrc;
  profileAvatarNode.setAttribute("aria-label", `${firstName} ${lastName}`);

  if (!avatarSrc) {
    // profileAvatarNode.remove();

    console.log("Hello")

    profileAvatarDiv.classList.add("profile-avatar-initials");
    const firstInitial = firstName[0];
    const secondInitial = lastName[0];
    const initials = `${firstInitial}${secondInitial}`;
    profileAvatarDiv.innerHTML = initials;
  }
};
