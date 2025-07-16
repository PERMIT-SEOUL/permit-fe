"use client";

import { Button } from "@permit/design-system";
import { useLogoutMutation } from "@/data/users/postUserLogout/mutation";

/**
 * NOTE: 로그아웃 테스트를 위한 페이지
 */
const SignoutPage = () => {
  const { mutateAsync } = useLogoutMutation();

  const handleSignout = async () => {
    try {
      await mutateAsync();

      alert("로그아웃 성공!");
    } catch (error) {
      console.error(error);
      alert(`error: ${JSON.stringify(error)}`);
    }
  };

  return <Button onClick={handleSignout}>로그아웃</Button>;
};

export default SignoutPage;
