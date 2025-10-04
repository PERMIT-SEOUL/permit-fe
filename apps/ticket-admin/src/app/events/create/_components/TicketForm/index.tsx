import classNames from "classnames/bind";

import { Button, Flex, Select, TextField, Typography } from "@permit/design-system";
import type { UseTextFieldReturn } from "@permit/design-system/hooks";

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
}: TicketFormProps) {
  return (
    <div className={cx("ticket_form")}>
      <div className={cx("ticket_form_header")}>
        <Typography type="body16" weight="bold">
          Add
        </Typography>
        <Button variant="error" size="sm" onClick={onDelete}>
          delete
        </Button>
      </div>

      <div className={cx("ticket_form_content")}>
        <Flex gap={24}>
          <Flex className={cx("row")} direction="column" gap={12}>
            <Typography type="body14" weight="medium">
              티켓 종류, 이름
            </Typography>
            <TextField
              placeholder="티켓 이름을 입력해주세요"
              value={ticketNameField.value}
              onChange={ticketNameField.handleChange}
              error={ticketNameField.error}
            />
          </Flex>
        </Flex>

        <Flex gap={24}>
          <Flex className={cx("row")} direction="column" gap={12}>
            <Typography type="body14" weight="medium">
              Price
            </Typography>
            <TextField
              placeholder="가격을 입력해주세요"
              value={priceField.value}
              onChange={priceField.handleChange}
              error={priceField.error}
            />
          </Flex>
        </Flex>

        <Flex gap={24}>
          <Flex className={cx("row")} direction="column" gap={12}>
            <Typography type="body14" weight="medium">
              티켓수
            </Typography>
            <TextField
              placeholder="티켓 개수를 입력해주세요"
              value={ticketCountField.value}
              onChange={ticketCountField.handleChange}
              error={ticketCountField.error}
            />
          </Flex>
        </Flex>

        <Flex gap={24}>
          <Flex className={cx("row")} direction="column" gap={12}>
            <Typography type="body14" weight="medium">
              start date
            </Typography>
            <Select type="calendar" placeholder="yy.mm.dd" {...ticketStartDateField} />
          </Flex>
          <Flex className={cx("row")} direction="column" gap={12}>
            <Typography type="body14" weight="medium">
              end date
            </Typography>
            <Select type="calendar" placeholder="yy.mm.dd" {...ticketEndDateField} />
          </Flex>
        </Flex>

        <Flex gap={24}>
          <Flex className={cx("row")} direction="column" gap={12}>
            <Typography type="body14" weight="medium">
              Start time
            </Typography>
            <TextField
              placeholder="시작 시간을 입력해주세요 (hh:mm)"
              value={ticketStartTimeField.value}
              onChange={ticketStartTimeField.handleChange}
              error={ticketStartTimeField.error}
            />
          </Flex>
          <Flex className={cx("row")} direction="column" gap={12}>
            <Typography type="body14" weight="medium">
              end time
            </Typography>
            <TextField
              placeholder="종료 시간을 입력해주세요 (hh:mm)"
              value={ticketEndTimeField.value}
              onChange={ticketEndTimeField.handleChange}
              error={ticketEndTimeField.error}
            />
          </Flex>
        </Flex>
      </div>
    </div>
  );
}
