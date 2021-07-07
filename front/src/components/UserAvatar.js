// import { useState } from "react";
// ''

const UserAvatar = (props) => {
  const { photo } = props;

  if (photo === "avatar") {
    console.log(photo);

    return (
      <div className="userImage">
        <img height="150" width="150" src={"../images/avatar.png"} alt="icon" />
      </div>
    );
  } else {
    return (
      <div className="userImage">
        <img
          src={`${process.env.PUBLIC_URL}/avatars/${photo}.jpg`}
          alt="Foto de usuario"
        />
      </div>
    );
  }
};

export default UserAvatar;
