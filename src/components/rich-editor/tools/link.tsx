import type { KeyboardEvent, MouseEvent } from "react";

import { PopoverClose } from "@radix-ui/react-popover";
import { useTiptap, useTiptapState } from "@tiptap/react";
import { Check, Link2 } from "lucide-react";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const AddLink = () => {
  const { editor } = useTiptap();
  const linkRef = useRef<HTMLInputElement>(null);
  const haveLink = useTiptapState((ctx) => ctx.editor.isActive("link"));
  const handleAddLink = () => {
    const linkInput = linkRef.current;
    if (linkInput) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkInput.value })
        .run();
      linkInput.value = "";
    }
  };
  const removeLink = (e: MouseEvent<HTMLButtonElement>) => {
    if (haveLink) {
      e.preventDefault();
      editor.chain().focus().unsetLink().run();
    }
  };
  const handleKeyDownForEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddLink();
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          className="line-through"
          type="button"
          variant={haveLink ? "default" : "outline"}
          onClick={removeLink}
        >
          <Link2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Field>
          <Label htmlFor="add-link-input">لینک اضافه کنید</Label>
          <div className="flex gap-1.5">
            <Input
              dir="ltr"
              id="add-link-input"
              ref={linkRef}
              type="url"
              onKeyDown={handleKeyDownForEnter}
            />
            <PopoverClose asChild>
              <Button size="icon-sm" onClick={handleAddLink}>
                <Check />
              </Button>
            </PopoverClose>
          </div>
        </Field>
      </PopoverContent>
    </Popover>
  );
};

export default AddLink;
