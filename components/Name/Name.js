import { useState } from "react";
import { isAuthState } from "../../pages/index";
import styles from "./Name.module.scss";
import { atom, useSetRecoilState } from "recoil";

export const userNameState = atom({
  key: "userName",
  default: ""
});

export default function Name() {
  const setIsAuth = useSetRecoilState(isAuthState);
  const setUserName = useSetRecoilState(userNameState);
  const [name, setName] = useState("");

  const handleClick = () => {
    setUserName(name);
    setIsAuth(true);
  };
  return (
    <>
      <input
        placeholder="Full Name"
        className={styles.name}
        onChange={(e) => setName(e.target.value)}
        value={name}
        name="phoneNumber"
        type="text"
      />

      <button className={styles.btn} onClick={() => handleClick()}>
        Confirm
      </button>
    </>
  );
}
