"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import classNames from "classnames/bind";

import { signupMutationOptions } from "@/data/users/postUserSignup/mutation";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

const REDIRECT_URI = "http://localhost:3000/auth";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    userName: "",
    userAge: 0,
    userSex: "MALE" as "MALE" | "FEMALE",
    userEmail: "",
    socialType: "KAKAO" as "GOOGLE" | "KAKAO", // TODO: 로컬 스토리지에서 꺼내는 작업 추가
    authorizationCode: "", // TODO: 응답 토큰 store 에서 꺼내는 작업 추가
    redirectUrl: REDIRECT_URI,
  });

  const { mutateAsync, isPending } = useMutation({
    ...signupMutationOptions(),
    onError: (error) => {
      alert("회원가입에 실패했습니다.");
      console.error("회원가입 실패:", error);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submitData = {
      ...formData,
      userAge: formData.userAge,
    };

    mutateAsync(submitData);
  };

  return (
    <div className={cx("container")}>
      <h1 className={cx("title")}>회원가입</h1>

      <form onSubmit={handleSubmit} className={cx("form")}>
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
}
