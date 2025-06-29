import { CURRENT_ENV } from "@/shared/constants/env";

export default function Home() {
  return (
    <div>
      Hello world!
      <br />
      current env is {CURRENT_ENV}
    </div>
  );
}
