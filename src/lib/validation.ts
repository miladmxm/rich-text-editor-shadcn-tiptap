import * as v from "valibot";
const URLschema = v.pipe(v.string(), v.url());
const StringSchema = v.pipe(v.string(), v.nonEmpty());
export const validateUrl = (input?: string) => {
  const { success, output } = v.safeParse(URLschema, input);
  if (success) return output;
};
export const validateString = (input?: string) => {
  const { success, output } = v.safeParse(StringSchema, input);
  if (success) return output;
};
