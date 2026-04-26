import { useTiptap } from "@tiptap/react";
import { Image } from "lucide-react";

import { Button } from "../../ui/button";

const AddImage = () => {
  const { editor } = useTiptap();

  if (!editor) return;
  const onClickHandler = ({ url, alt }: { url: string; alt: string }) => {
    editor
      .chain()
      .focus()
      .setImage({
        src: url,
        alt,
        height: 200,
      })
      .run();
  };
  return (
    <Button
      size="sm"
      type="button"
      variant="ghost"
      onClick={() => {
        onClickHandler({ alt: "any", url: "http://" });
      }}
    >
      <Image />
      افزودن تصویر
    </Button>
  );
};

export default AddImage;
