"use client";

import { useState } from "react";
import classNames from "classnames/bind";

import { Button, TextField, Typography } from "@permit/design-system";
import { useTextField } from "@permit/design-system/hooks";
import { useCouponsQuery } from "@/data/admin/getCoupons/queries";
import { useMemoMutation } from "@/data/admin/patchMemos/mutation";
import { usePostCouponsMutation } from "@/data/admin/postCoupons/mutation";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  eventId: number;
};

export const CouponManagementClient = ({ eventId }: Props) => {
  const {
    data: couponsData,
    isLoading,
    refetch,
  } = useCouponsQuery({
    eventId,
    options: {
      refetchOnWindowFocus: true,
    },
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 메모를 각 쿠폰마다 편집할 수 있게 상태를 저장
  const [memoMap, setMemoMap] = useState<Record<number, string>>({});

  const discountRateField = useTextField({
    initialValue: "",
    validate: (value: string) => {
      if (!value.trim()) return "할인율을 입력해주세요.";

      const num = Number(value);

      if (isNaN(num) || num <= 0 || num > 100) return "할인율은 1-100 사이의 숫자여야 합니다.";

      return undefined;
    },
  });

  const [couponCount, setCouponCount] = useState(1);

  const { mutateAsync: createCoupons } = usePostCouponsMutation({
    options: {
      onSuccess: () => {
        refetch();
        discountRateField.handleChange({
          target: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>);
        setCouponCount(1);
      },
    },
  });

  const { mutateAsync: updateCouponMemo } = useMemoMutation({
    onSuccess: () => {
      refetch();
      // 메모를 저장한 뒤에는 edit 모드 끄고 메모 맵 초기화 (원한다면 초기화 안 해도 됨)
      setIsEditMode(false);
      setMemoMap({});
    },
  });

  const handleAddCoupon = async () => {
    const discountRate = Number(discountRateField.value);

    if (isNaN(discountRate) || discountRate <= 0 || discountRate > 100) {
      alert("할인율을 올바르게 입력해주세요.");

      return;
    }

    setIsSubmitting(true);

    try {
      await Promise.all(
        Array.from({ length: couponCount }, () =>
          createCoupons({
            eventId,
            discountRate,
            count: 1,
          }),
        ),
      );
      alert("쿠폰이 성공적으로 생성되었습니다.");
    } catch (error) {
      console.error("Error creating coupons:", error);
      alert("쿠폰 생성 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = () => {
    setIsEditMode(true);

    // edit 모드로 들어갈 때, 현재 메모들을 memoMap에 복사해둠
    const map: Record<number, string> = {};

    couponsData?.forEach((c) => {
      map[c.couponId] = c.memo || "";
    });
    setMemoMap(map);
  };

  const handleSaveClick = async () => {
    setIsSubmitting(true);

    try {
      const memoList = {
        coupons: Object.entries(memoMap).map(([couponId, memo]) => ({
          couponId: Number(couponId),
          memo,
        })),
      };

      await updateCouponMemo(memoList);

      alert("메모가 성공적으로 저장되었습니다.");
    } catch (error) {
      console.error("Error updating memos:", error);
      alert("메모 저장 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!couponsData || isLoading) {
    return (
      <div className={cx("container")}>
        <Typography type="body16">Loading...</Typography>
      </div>
    );
  }

  const coupons = couponsData;

  return (
    <div className={cx("container")}>
      <main className={cx("main")}>
        {/* Add Coupon Section */}
        <section className={cx("add_section")}>
          <Typography type="title24" className={cx("section_title")}>
            Add Coupon
          </Typography>
          <div className={cx("add_form")}>
            <div className={cx("form_row")}>
              <div className={cx("form_field")}>
                <Typography type="body14" weight="medium" className={cx("field_label")}>
                  Discount Rate
                </Typography>
                <TextField
                  value={discountRateField.value}
                  onChange={discountRateField.handleChange}
                  error={discountRateField.error}
                  placeholder="할인율을 입력해주세요"
                  fullWidth
                />
              </div>
              <div className={cx("form_field")}>
                <Typography type="body14" weight="medium" className={cx("field_label")}>
                  Coupons
                </Typography>
                <div className={cx("count_control")}>
                  <button
                    type="button"
                    onClick={() => setCouponCount((prev) => Math.max(1, prev - 1))}
                    className={cx("count_button")}
                  >
                    –
                  </button>
                  <input
                    type="number"
                    value={couponCount}
                    onChange={(e) => setCouponCount(Math.max(1, Number(e.target.value) || 1))}
                    className={cx("count_input")}
                    min="1"
                  />
                  <button
                    type="button"
                    onClick={() => setCouponCount((prev) => prev + 1)}
                    className={cx("count_button")}
                  >
                    +
                  </button>
                </div>
              </div>
              <Button
                variant="cta"
                size="md"
                onClick={handleAddCoupon}
                disabled={isSubmitting}
                className={cx("add_button")}
              >
                Add
              </Button>
            </div>
          </div>
        </section>

        {/* Coupon List Section */}
        <section className={cx("list_section")}>
          <div className={cx("list_header")}>
            <Typography type="title24" className={cx("section_title")}>
              Coupon List Management
            </Typography>
            <div className={cx("header_actions")}>
              {isEditMode ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSaveClick}
                  disabled={isSubmitting}
                >
                  Save
                </Button>
              ) : (
                <Button variant="primary" size="sm" onClick={handleEditClick}>
                  Edit
                </Button>
              )}
            </div>
          </div>

          <div className={cx("table_container")}>
            <table className={cx("coupon_table")}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Discount Rate</th>
                  <th>Code</th>
                  <th>Memo</th>
                  <th>State</th>
                </tr>
              </thead>
              <tbody>
                {coupons.length === 0 ? (
                  <tr>
                    <td colSpan={5} className={cx("empty_cell")}>
                      <Typography type="body14" color="gray400">
                        쿠폰이 없습니다.
                      </Typography>
                    </td>
                  </tr>
                ) : (
                  coupons.map((coupon) => (
                    <tr key={coupon.couponId}>
                      <td>{coupon.createDate}</td>
                      <td>{coupon.discountRate}%</td>
                      <td>{coupon.couponCode}</td>
                      <td>
                        {isEditMode ? (
                          <input
                            type="text"
                            value={memoMap[coupon.couponId] ?? ""}
                            onChange={(e) =>
                              setMemoMap((prev) => ({
                                ...prev,
                                [coupon.couponId]: e.target.value,
                              }))
                            }
                            className={cx("memo_input")}
                          />
                        ) : (
                          coupon.memo || "-"
                        )}
                      </td>
                      <td>
                        <span
                          className={cx("state_badge", {
                            usable: !coupon.usable,
                            used: coupon.usable,
                          })}
                        >
                          {coupon.usable ? "Used ticket" : "Usable"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};
