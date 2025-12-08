import { EntryClient } from "./_clientBounday/EntryClient";

type Props = {
  params: Promise<{ ticketCode: string }>;
};

const EntryPage = async ({ params }: Props) => {
  const { ticketCode } = await params;

  return <EntryClient ticketCode={ticketCode} />;
};

export default EntryPage;
