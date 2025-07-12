import { Flex, Typography } from "@permit/design-system";

interface Props {
  title: string;
  value: string;
}

export const InfoText = ({ title, value }: Props) => {
  return (
    <Flex direction="column" gap={4}>
      <Typography type="body14" color="gray400">
        {title}
      </Typography>
      <Typography type="body14" color="white">
        {value}
      </Typography>
    </Flex>
  );
};
