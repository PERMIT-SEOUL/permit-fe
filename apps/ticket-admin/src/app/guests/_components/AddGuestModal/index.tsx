"use client";

import { useState } from "react";
import classNames from "classnames/bind";

import { Button, Dialog, Flex, TextField, Typography } from "@permit/design-system";
import { useTextField } from "@permit/design-system/hooks";
import { usePostGuestMutation } from "@/data/admin/postGuest/mutation";
import { ModalComponentProps } from "@/shared/hooks/useModal/types";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {} & ModalComponentProps<{ result: boolean }>;

export function AddGuestModal({ isOpen, close }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutateAsync: createGuest } = usePostGuestMutation({});

  // 폼 필드들
  const guestNameField = useTextField({
    initialValue: "",
    validate: (value: string) => {
      if (!value.trim()) return "이름을 입력해주세요.";

      return undefined;
    },
  });

  const guestTypeField = useTextField({
    initialValue: "",
    validate: (value: string) => {
      if (!value.trim()) return "게스트 타입을 입력해주세요.";

      return undefined;
    },
  });

  const affiliationField = useTextField({
    initialValue: "",
    validate: (value: string) => {
      if (!value.trim()) return "소속을 입력해주세요.";

      return undefined;
    },
  });

  const phoneNumberField = useTextField({
    initialValue: "",
    validate: () => undefined, // 선택사항
  });

  const emailField = useTextField({
    initialValue: "",
    validate: (value: string) => {
      if (!value.trim()) return "이메일을 입력해주세요.";

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(value)) return "올바른 이메일 형식이 아닙니다.";

      return undefined;
    },
  });

  const handleSubmit = async () => {
    // 유효성 검사
    const isNameValid = guestNameField.validateValue();
    const isTypeValid = guestTypeField.validateValue();
    const isAffiliationValid = affiliationField.validateValue();
    const isEmailValid = emailField.validateValue();

    if (!isNameValid || !isTypeValid || !isAffiliationValid || !isEmailValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      await createGuest({
        guestName: guestNameField.value,
        guestType: guestTypeField.value,
        affiliation: affiliationField.value,
        phoneNumber: phoneNumberField.value || undefined,
        email: emailField.value,
      });

      alert("게스트가 성공적으로 추가되었습니다.");

      // 폼 초기화
      //   guestNameField.setValue("");
      //   guestTypeField.setValue("");
      //   affiliationField.setValue("");
      //   phoneNumberField.setValue("");
      //   emailField.setValue("");

      close({ result: true });
    } catch (error) {
      alert("게스트 추가 중 오류가 발생했습니다. 다시 시도해주세요.");
      console.error("Error creating guest:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      close();
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} title="Add Guest">
      <Dialog.Content>
        <div className={cx("form")}>
          <Flex direction="column" gap={16}>
            <Flex direction="column" gap={8}>
              <Typography type="body14" weight="medium">
                이름 <span className={cx("required")}>*</span>
              </Typography>
              <TextField
                placeholder="이름을 입력해주세요"
                value={guestNameField.value}
                onChange={guestNameField.handleChange}
                error={guestNameField.error}
                disabled={isSubmitting}
              />
            </Flex>

            <Flex direction="column" gap={8}>
              <Typography type="body14" weight="medium">
                게스트 타입 <span className={cx("required")}>*</span>
              </Typography>
              <TextField
                placeholder="게스트 타입을 입력해주세요"
                value={guestTypeField.value}
                onChange={guestTypeField.handleChange}
                error={guestTypeField.error}
                disabled={isSubmitting}
              />
            </Flex>

            <Flex direction="column" gap={8}>
              <Typography type="body14" weight="medium">
                소속 <span className={cx("required")}>*</span>
              </Typography>
              <TextField
                placeholder="소속을 입력해주세요"
                value={affiliationField.value}
                onChange={affiliationField.handleChange}
                error={affiliationField.error}
                disabled={isSubmitting}
              />
            </Flex>

            <Flex direction="column" gap={8}>
              <Typography type="body14" weight="medium">
                전화번호
              </Typography>
              <TextField
                placeholder="전화번호를 입력해주세요"
                value={phoneNumberField.value}
                onChange={phoneNumberField.handleChange}
                error={phoneNumberField.error}
                disabled={isSubmitting}
              />
            </Flex>

            <Flex direction="column" gap={8}>
              <Typography type="body14" weight="medium">
                이메일 <span className={cx("required")}>*</span>
              </Typography>
              <TextField
                placeholder="이메일을 입력해주세요"
                value={emailField.value}
                onChange={emailField.handleChange}
                error={emailField.error}
                disabled={isSubmitting}
              />
            </Flex>
          </Flex>
        </div>
      </Dialog.Content>
      <Dialog.Bottom>
        <Flex gap={12}>
          <Button variant="secondary" size="md" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            variant="cta"
            size="md"
            onClick={handleSubmit}
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            save
          </Button>
        </Flex>
      </Dialog.Bottom>
    </Dialog>
  );
}
