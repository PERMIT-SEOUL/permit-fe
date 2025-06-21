import { getQueryClient } from "@/lib/queryClient/helpers/getQueryClient";

import { SuspenseTest } from "./_suspense/SuspenseTest";

export default function Sample() {
  const qc = getQueryClient();

  return (
    <div>
      <h1>🚀 Streaming SSR Example</h1>

      <SuspenseTest qc={qc} />
    </div>
  );
}
