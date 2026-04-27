import * as v from "valibot";
const URLschema = v.pipe(v.string(), v.url());
export const validateUrl = (input?: string) => {
  const { success, output } = v.safeParse(URLschema, input);
  if (success) return output;
};
