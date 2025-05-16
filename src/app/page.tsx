import { BodyContainer } from "@/components/BodyContainer";
import { CardContainer } from "@/components/CardContainer";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <BodyContainer>
        <CardContainer />
      </BodyContainer>
    </div>
  );
}
