import { Button, Flex, Typography } from "@permit/design-system";

export const GlobalErrorPage = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap={16}
      style={{ height: "calc(100vh - 150px)" }}
    >
      <Typography type="title24">서비스에 문제가 발생했어요</Typography>
      <Typography type="body14">잠시 후 다시 시도해주세요</Typography>
      <Button
        variant="primary"
        size="md"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        홈으로 이동
      </Button>
    </Flex>
  );
};
