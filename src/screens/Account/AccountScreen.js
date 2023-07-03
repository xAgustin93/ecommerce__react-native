import { Layout } from "../../layouts";
import { UserInfo, Menu } from "../../components/Account";

export function AccountScreen() {
  return (
    <Layout.Basic>
      <UserInfo />
      <Menu />
    </Layout.Basic>
  );
}
