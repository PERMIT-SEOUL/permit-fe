import { Flex, Typography } from "@permit/design-system";

type Props = {
  lineup: {
    category: string;
    artists: { name: string }[];
  }[];
};

export const LineupText = ({ lineup }: Props) => {
  if (lineup.length === 0) {
    return (
      <Typography type="body14" color="gray400">
        라인업 정보가 없습니다.
      </Typography>
    );
  }

  return (
    <>
      {lineup.map((item) => (
        <Flex key={item.category} direction="column" gap={4}>
          <Typography type="body14" color="white">
            {item.category}
          </Typography>
          {item.artists.length > 0 ? (
            item.artists.map((artist) => (
              <Typography key={artist.name} type="body14" color="white">
                {artist.name}
              </Typography>
            ))
          ) : (
            <Typography type="body14" color="gray400">
              아티스트 정보가 없습니다.
            </Typography>
          )}
        </Flex>
      ))}
    </>
  );
};
