import { useState } from "react";
import styles from "./Login.module.scss";
import { isAuthState } from "../../pages/index";
import { atom, useSetRecoilState } from "recoil";
import axios from "axios";

export const phoneState = atom({
  key: "phone",
  default: ""
});

export default function Login() {
  const [waiting, setWaiting] = useState(false);
  const setIsAuth = useSetRecoilState(isAuthState);
  const setphone = useSetRecoilState(phoneState);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oTP, setOTP] = useState("");
  const [message, setMessage] = useState("");

  const handleClick = async () => {
    setMessage("");
    if (waiting) {
      axios
        .post(
          "https://upkqi.sse.codesandbox.io/Login",
          { phoneNumber, oTP },
          { "content-type": "application/json" }
        )
        .then((res) => {
          res.data === "done" && setIsAuth(true);
          res.data !== "done" && setMessage(res.data);
        });
    } else {
      axios
        .post(
          "https://upkqi.sse.codesandbox.io/otp",
          { phoneNumber },
          { "content-type": "application/json" }
        )
        .then((res) => {
          res.data === "done" && setWaiting(true);
          res.data === "done" && setphone(phoneNumber);
          res.data !== "done" && setMessage(res.data);
        });
    }
  };

  return (
    <div className={styles.container}>
      <div>{message}</div>
      <input
        placeholder="Phone Number"
        className={styles.phone}
        onChange={(e) => setPhoneNumber(e.target.value)}
        value={phoneNumber}
        name="phoneNumber"
        type="number"
        disabled={waiting}
      />

      {waiting && (
        <input
          placeholder="Wait for OTP"
          className={styles.phone}
          value={oTP}
          onChange={(e) => setOTP(e.target.value)}
          type="number"
        />
      )}

      <button className={styles.btn} onClick={() => handleClick()}>
        {waiting ? "Login" : "request OTP"}
      </button>
    </div>
  );
}
