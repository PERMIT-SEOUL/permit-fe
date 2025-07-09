import { Flex, Typography } from "@permit/design-system";

type Props = {
  lineup: {
    category: string;
    artists: { name: string }[];
  }[];
};

export const LineupText = ({ lineup }: Props) => {
  return (
    <>
      {lineup.map((item) => (
        <Flex key={item.category} direction="column" gap={4}>
          <Typography type="body14" color="white">
            {item.category}
          </Typography>
          {item.artists.map((artist) => (
            <Typography key={artist.name} type="body14" color="white">
              {artist.name}
            </Typography>
          ))}
        </Flex>
      ))}
    </>
  );
};
