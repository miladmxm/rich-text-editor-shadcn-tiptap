import { useTiptap } from "@tiptap/react";
import { Check, Image } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { validateString, validateUrl } from "@/lib/validation";

import { Button } from "../../ui/button";

const defaultErrorMessages = { alt: "", url: "" };
const AddImage = () => {
  const { editor } = useTiptap();
  const inputImageRef = useRef<HTMLInputElement>(null);
  const inputAltRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState(defaultErrorMessages);

  const handleAddImage = ({ url, alt }: { url: string; alt: string }) => {
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
  const handleSubmit = () => {
    const url = validateUrl(inputImageRef.current?.value);
    const alt = validateString(inputAltRef.current?.value);
    if (url && alt) {
      handleAddImage({ url, alt });
      setOpen(false);
    } else {
      setErrorMessage({
        alt: !alt ? "متن جایگزین را وارد کنید" : "",
        url: !url ? "این آدرس صحیح نیست" : "",
      });
    }
  };
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button size="sm" type="button" variant="ghost">
          <Image />
          افزودن تصویر
        </Button>
      </DialogTrigger>
      <DialogContent dir="rtl">
        <DialogTitle>افزودن تصویر</DialogTitle>
        <DialogDescription>
          آدرس تصویر و متن جایگزین مدنظر خود را وارد کنید!
        </DialogDescription>
        <FieldGroup>
          <Field aria-invalid={!!errorMessage.url} className="flex-auto">
            <Input
              dir="ltr"
              ref={inputImageRef}
              placeholder="https://example.com/example.png"
              onFocus={() => {
                setErrorMessage(defaultErrorMessages);
              }}
            />
            {errorMessage.url && (
              <FieldError errors={[{ message: errorMessage.url }]} />
            )}
          </Field>
          <Field aria-invalid={!!errorMessage.alt} className="flex-auto">
            <Input
              ref={inputAltRef}
              dir="ltr"
              placeholder="example image"
              onFocus={() => {
                setErrorMessage(defaultErrorMessages);
              }}
            />
            {errorMessage.alt && (
              <FieldError errors={[{ message: errorMessage.alt }]} />
            )}
          </Field>
          <Button type="button" onClick={handleSubmit}>
            <Check />
          </Button>
        </FieldGroup>
      </DialogContent>
    </Dialog>
  );
};

export default AddImage;
