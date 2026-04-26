import { useTiptap } from "@tiptap/react";
import { Music } from "lucide-react";

import { Button } from "../../ui/button";

const AddAudio = () => {
  const { editor } = useTiptap();
  const handleAddAudio = ({ url }: { url: string }) => {
    editor.chain().focus().setAudio({ src: url }).run();
  };
  return (
    <>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => {
          // todo show dialog
          handleAddAudio({ url: "http://any.mp4" });
        }}
      >
        <Music />
        افزودن صدا
      </Button>
    </>
  );
};

export default AddAudio;
