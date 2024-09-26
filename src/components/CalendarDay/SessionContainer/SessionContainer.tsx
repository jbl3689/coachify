import { FlexBox } from "@/components/ui/FlexBox";
import Heading from "@/components/ui/Heading";

function SessionContainer() {
  return (
    <FlexBox
      container
      flexDirection="column"
      gap="25px"
      className="bg-secondaryBase"
    >
      <Heading as="h4">Session Container</Heading>
    </FlexBox>
  );
}

export default SessionContainer;
