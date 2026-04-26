import { useTiptap } from "@tiptap/react";
import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";

const Clear = () => {
  const { editor } = useTiptap();
  return (
    <Button
      size="icon-sm"
      type="button"
      variant="outline"
      onClick={() => editor.commands.clearContent(true)}
    >
      <Trash />
    </Button>
  );
};

export default Clear;
