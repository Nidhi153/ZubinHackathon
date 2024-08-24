import Image from "next/image";
import userIcon from "../../../assets/userIcon.svg";
import styles from "./AccountButton.module.scss";
import Link from "next/link";

interface AccountButtonProps {
  username: string;
}

const AccountButton = ({ username }: AccountButtonProps) => {
  return (
    <Link className={styles.accountButton} href="/account">
      <Image src={userIcon} alt="User Icon" />
      <div>{username}</div>
    </Link>
  );
};

export default AccountButton;
