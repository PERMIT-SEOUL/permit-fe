"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames/bind";

import { useSignupMutation } from "@/data/users/postUserSignup/mutation";
import { safeLocalStorage } from "@/lib/storage";
import { PAGE_URL } from "@/shared/constants/pageUrl";
import { SOCIAL_LOGIN_TYPE_KEY, TOKEN_KEY } from "@/shared/constants/storage";
import { SocialLoginType } from "@/shared/hooks/useOAuth/types";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

/**
 * 회원가입 페이지
 */
const SignupPage = () => {
  const router = useRouter();

  const token = safeLocalStorage.get(TOKEN_KEY);
  const socialType = safeLocalStorage.get(SOCIAL_LOGIN_TYPE_KEY) as SocialLoginType;

  const [formData, setFormData] = useState({
    userName: "",
    userAge: 0,
    userSex: "MALE" as "MALE" | "FEMALE",
    userEmail: "",
    socialType: socialType,
    socialAccessToken: token || "",
  });

  const { mutateAsync, isPending } = useSignupMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();

    const submitData = {
      ...formData,
      userAge: formData.userAge,
    };

    try {
      await mutateAsync(submitData);

      // signup API 요청에 필요한 정보 제거
      safeLocalStorage.remove(TOKEN_KEY);
      safeLocalStorage.remove(SOCIAL_LOGIN_TYPE_KEY);

      // TODO: redirect 로직 구체적으로 추가
      router.replace(PAGE_URL.HOME);
    } catch (error) {
      alert("회원가입에 실패했습니다.");
      console.error("회원가입 실패:", error);
    }
  };

  return (
    <div className={cx("container")}>
      <h1 className={cx("title")}>회원가입</h1>

      <form onSubmit={handleSignup} className={cx("form")}>
        <div className={cx("fieldGroup")}>
          <label htmlFor="userName" className={cx("label")}>
            이름
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
            className={cx("input")}
          />
        </div>

        <div className={cx("fieldGroup")}>
          <label htmlFor="userAge" className={cx("label")}>
            나이
          </label>
          <input
            type="number"
            id="userAge"
            name="userAge"
            value={formData.userAge}
            onChange={handleChange}
            required
            min="1"
            max="120"
            className={cx("input")}
          />
        </div>

        <div className={cx("fieldGroup")}>
          <label htmlFor="userSex" className={cx("label")}>
            성별
          </label>
          <select
            id="userSex"
            name="userSex"
            value={formData.userSex}
            onChange={handleChange}
            required
            className={cx("select")}
          >
            <option value="MALE">남성</option>
            <option value="FEMALE">여성</option>
          </select>
        </div>

        <div className={cx("fieldGroup")}>
          <label htmlFor="userEmail" className={cx("label")}>
            이메일
          </label>
          <input
            type="email"
            id="userEmail"
            name="userEmail"
            value={formData.userEmail}
            onChange={handleChange}
            required
            className={cx("input")}
          />
        </div>

        <button type="submit" disabled={isPending} className={cx("submitButton")}>
          {isPending ? "처리중..." : "회원가입"}
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
