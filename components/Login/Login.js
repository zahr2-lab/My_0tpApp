import styles from "./Login.module.scss";
import PhoneOTP from "../PhoneOTP/PhoneOTP";
import { atom, useRecoilValue } from "recoil";
import Name from "../Name/Name";

export const PhonePageState = atom({
  key: "phonePage",
  default: true
});

export default function Login() {
  const phonePage = useRecoilValue(PhonePageState);
  return (
    <div className={styles.container}>
      {phonePage ? <PhoneOTP /> : <Name />}
    </div>
  );
}
