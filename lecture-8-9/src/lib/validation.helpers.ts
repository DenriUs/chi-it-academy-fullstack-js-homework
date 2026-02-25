import zod, { ZodObject } from 'zod';
import { fromError } from 'zod-validation-error';

export type SchemaInput = Record<string, unknown>;

export const checkHasNoSpaces = (value: string) => {
  return /^\S+$/.test(value);
};

export const checkHasOneNonSpaceCharacter = (value: string) => {
  return /\S/.test(value);
};

export const validateValues = <T extends ZodObject>(
  schema: T,
  values: SchemaInput,
  fallbackValues: SchemaInput,
) => {
  const result = schema.safeParse(values);
  if (result.success) {
    return result.data as zod.infer<T>;
  }

  const fallbackValuesResult = schema.safeParse(fallbackValues);
  if (fallbackValuesResult.error) {
    const validationErrors = fromError(fallbackValuesResult.error);
    throw new Error(validationErrors.toString());
  }

  const errorFields = Object.keys(zod.treeifyError(result.error).properties!);
  const validatedValues: Record<string, unknown> = {};
  for (const schemaKey of Object.keys(schema.shape)) {
    validatedValues[schemaKey] = values[schemaKey];
  }
  for (const errorField of errorFields) {
    validatedValues[errorField] = fallbackValues[errorField];
  }
  return validatedValues as zod.infer<T>;
};
