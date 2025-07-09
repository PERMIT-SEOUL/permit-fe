import { CURRENT_ENV } from "@/shared/constants/env";

/**
 * 홈 페이지
 */
const Home = () => {
  return (
    <div>
      Hello world!
      <br />
      current env is {CURRENT_ENV}
    </div>
  );
};

export default Home;
