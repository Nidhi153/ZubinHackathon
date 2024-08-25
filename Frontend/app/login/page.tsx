import Authentication from "../components/Authentication/Authentication";
import HomepageLayout from "../components/HomepageLayout/HomepageLayout";

const Page = () => {
  return (
    <HomepageLayout header="Log In">
      <Authentication></Authentication>
    </HomepageLayout>
  );
};
export default Page;
