import styles from "./styles.module.scss";
import Chat from "../components/Chat/Chat";
import Login from "../components/Login/Login";
import { atom, useRecoilValue } from "recoil";

export const isAuthState = atom({
  key: "isAuth",
  default: false
});

export default function IndexPage() {
  const isAuth = useRecoilValue(isAuthState);
  return (
    <div>
      <div className={styles.title}>Chat App</div>
      {isAuth ? <Chat /> : <Login />}
    </div>
  );
}
