import classNames from "classnames/bind";

import { Button, Flex, Select, TextField, Typography } from "@permit/design-system";
import type { UseTextFieldReturn } from "@permit/design-system/hooks";
import type { TicketErrors } from "@/shared/helpers/validation";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export type TicketData = {
  id: string;
  ticketName: string;
  price: number;
  ticketCount: number;
  ticketStartDate: string;
  ticketStartTime: string;
  ticketEndDate: string;
  ticketEndTime: string;
};

type SelectField = {
  value: string;
  onChange: (value: string) => void;
};

type TicketFormProps = {
  ticketData: TicketData;
  onUpdate: (data: TicketData) => void;
  onDelete: () => void;
  ticketNameField: Partial<UseTextFieldReturn>;
  priceField: Partial<UseTextFieldReturn>;
  ticketCountField: Partial<UseTextFieldReturn>;
  ticketStartDateField: SelectField;
  ticketEndDateField: SelectField;
  ticketStartTimeField: Partial<UseTextFieldReturn>;
  ticketEndTimeField: Partial<UseTextFieldReturn>;
  errors?: TicketErrors;
};

export function TicketForm({
  ticketData,
  onUpdate,
  onDelete,
  ticketNameField,
  priceField,
  ticketCountField,
  ticketStartDateField,
  ticketEndDateField,
  ticketStartTimeField,
  ticketEndTimeField,
  errors,
}: TicketFormProps) {
  return (
    <div className={cx("ticket_form")}>
      <div className={cx("ticket_form_header")}>
        <Typography type="body16" weight="bold">
          Add
        </Typography>
        {ticketData.id.startsWith("ticket-") && (
          <Button variant="error" size="sm" onClick={onDelete}>
            delete
          </Button>
        )}
      </div>

      <div className={cx("ticket_form_content")}>
        <Flex className={cx("form_row")} gap={24}>
          <Flex className={cx("row")} direction="column" gap={12}>
            <Flex align="flex-start" gap={8}>
              <Typography type="body14" weight="medium">
                티켓 종류, 이름
              </Typography>
              <div className={cx("required")}>*</div>
            </Flex>
            <TextField
              placeholder="티켓 이름을 입력해주세요"
              value={ticketNameField.value}
              onChange={ticketNameField.handleChange}
              error={errors?.ticketName ?? ticketNameField.error}
            />
          </Flex>
        </Flex>

        <Flex className={cx("form_row")} gap={24}>
          <Flex className={cx("row")} direction="column" gap={12}>
            <Flex align="flex-start" gap={8}>
              <Typography type="body14" weight="medium">
                Price
              </Typography>
              <div className={cx("required")}>*</div>
            </Flex>
            <TextField
              placeholder="가격을 입력해주세요"
              value={priceField.value}
              onChange={priceField.handleChange}
              error={errors?.price ?? priceField.error}
            />
          </Flex>
        </Flex>

        <Flex className={cx("form_row")} gap={24}>
          <Flex className={cx("row")} direction="column" gap={12}>
            <Flex align="flex-start" gap={8}>
              <Typography type="body14" weight="medium">
                티켓수
              </Typography>
              <div className={cx("required")}>*</div>
            </Flex>
            <TextField
              placeholder="티켓 개수를 입력해주세요"
              value={ticketCountField.value}
              onChange={ticketCountField.handleChange}
              error={errors?.ticketCount ?? ticketCountField.error}
            />
          </Flex>
        </Flex>

        <Flex className={cx("form_row")} gap={24}>
          <Flex className={cx("row")} direction="column" gap={12}>
            <Flex align="flex-start" gap={8}>
              <Typography type="body14" weight="medium">
                start entry date
              </Typography>
              <div className={cx("required")}>*</div>
            </Flex>
            <Select
              type="calendar"
              placeholder="yy.mm.dd"
              {...ticketStartDateField}
              error={errors?.ticketStartDate}
            />
          </Flex>
          <Flex className={cx("row")} direction="column" gap={12}>
            <Flex align="flex-start" gap={8}>
              <Typography type="body14" weight="medium">
                start entry time
              </Typography>
              <div className={cx("required")}>*</div>
            </Flex>
            <TextField
              placeholder="티켓 입장 시작 시간을 입력해주세요 (hh:mm)"
              value={ticketStartTimeField.value}
              onChange={ticketStartTimeField.handleChange}
              error={errors?.ticketStartTime ?? ticketStartTimeField.error}
            />
          </Flex>
        </Flex>

        <Flex className={cx("form_row")} gap={24}>
          <Flex className={cx("row")} direction="column" gap={12}>
            <Flex align="flex-start" gap={8}>
              <Typography type="body14" weight="medium">
                end entry date
              </Typography>
              <div className={cx("required")}>*</div>
            </Flex>
            <Select
              type="calendar"
              placeholder="yy.mm.dd"
              {...ticketEndDateField}
              error={errors?.ticketEndDate}
            />
          </Flex>
          <Flex className={cx("row")} direction="column" gap={12}>
            <Flex align="flex-start" gap={8}>
              <Typography type="body14" weight="medium">
                end entry time
              </Typography>
              <div className={cx("required")}>*</div>
            </Flex>
            <TextField
              placeholder="티켓 입장 종료 시간을 입력해주세요 (hh:mm)"
              value={ticketEndTimeField.value}
              onChange={ticketEndTimeField.handleChange}
              error={errors?.ticketEndTime ?? ticketEndTimeField.error}
            />
          </Flex>
        </Flex>
      </div>
    </div>
  );
}
