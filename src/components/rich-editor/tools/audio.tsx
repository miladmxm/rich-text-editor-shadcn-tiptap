import { useTiptap } from "@tiptap/react";
import { Check, Music } from "lucide-react";

import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { validateUrl } from "@/lib/validation";

const AddAudio = () => {
  const { editor } = useTiptap();

  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleAddAudio = ({ url }: { url: string }) => {
    editor.chain().focus().setAudio({ src: url }).run();
  };
  const handleAddIframe = () => {
    const value = validateUrl(inputRef.current?.value);
    if (value) {
      handleAddAudio({ url: value });
      setOpen(false);
    } else {
      setErrorMessage("این آدرس صحیح نیست");
    }
  };
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost">
          <Music />
          افزودن صدا
        </Button>
      </DialogTrigger>
      <DialogContent dir="rtl">
        <DialogTitle>افزودن صوت</DialogTitle>
        <DialogDescription>آدرس صوت مدنظر خود را وارد کنید!</DialogDescription>
        <div className="flex gap-1 flex-row">
          <Field aria-invalid={!!errorMessage} className="flex-auto">
            <Input
              ref={inputRef}
              onFocus={() => {
                setErrorMessage("");
              }}
            />
            {errorMessage && (
              <FieldError errors={[{ message: errorMessage }]} />
            )}
          </Field>
          <Field className="flex-1">
            <Button type="button" onClick={handleAddIframe}>
              <Check />
            </Button>
          </Field>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddAudio;
