import {
  appendErrors,
} from "react-hook-form";
import {
  toNestErrors,
  validateFieldsNatively,
} from "@hookform/resolvers";
import * as z3 from "zod/v3";
import * as z4 from "zod/v4/core";

const isZod3Error = (error) => Array.isArray(error?.issues);

const isZod3Schema = (schema) =>
  "_def" in schema &&
  typeof schema._def === "object" &&
  "typeName" in schema._def;

const isZod4Error = (error) => error instanceof z4.$ZodError;

const isZod4Schema = (schema) =>
  "_zod" in schema && typeof schema._zod === "object";

function parseZod3Issues(zodErrors, validateAllFieldCriteria) {
  const errors = {};

  for (; zodErrors.length; ) {
    const error = zodErrors[0];
    const { code, message, path } = error;
    const pathKey = path.join(".");

    if (!errors[pathKey]) {
      if ("unionErrors" in error) {
        const unionError = error.unionErrors[0].errors[0];
        errors[pathKey] = {
          message: unionError.message,
          type: unionError.code,
        };
      } else {
        errors[pathKey] = { message, type: code };
      }
    }

    if ("unionErrors" in error) {
      error.unionErrors.forEach((unionError) =>
        unionError.errors.forEach((issue) => zodErrors.push(issue)),
      );
    }

    if (validateAllFieldCriteria) {
      const types = errors[pathKey].types;
      const messages = types && types[error.code];

      errors[pathKey] = appendErrors(
        pathKey,
        validateAllFieldCriteria,
        errors,
        code,
        messages
          ? [].concat(messages, error.message)
          : error.message,
      );
    }

    zodErrors.shift();
  }

  return errors;
}

function parseZod4Issues(zodErrors, validateAllFieldCriteria) {
  const errors = {};

  for (; zodErrors.length; ) {
    const error = zodErrors[0];
    const { code, message, path } = error;
    const pathKey = path.join(".");

    if (!errors[pathKey]) {
      if (error.code === "invalid_union" && error.errors.length > 0) {
        const unionError = error.errors[0][0];
        errors[pathKey] = {
          message: unionError.message,
          type: unionError.code,
        };
      } else {
        errors[pathKey] = { message, type: code };
      }
    }

    if (error.code === "invalid_union") {
      error.errors.forEach((unionError) =>
        unionError.forEach((issue) => zodErrors.push(issue)),
      );
    }

    if (validateAllFieldCriteria) {
      const types = errors[pathKey].types;
      const messages = types && types[error.code];

      errors[pathKey] = appendErrors(
        pathKey,
        validateAllFieldCriteria,
        errors,
        code,
        messages
          ? [].concat(messages, error.message)
          : error.message,
      );
    }

    zodErrors.shift();
  }

  return errors;
}

export function zodResolver(
  schema,
  schemaOptions,
  resolverOptions = {},
) {
  if (isZod3Schema(schema)) {
    return async (values, _, options) => {
      try {
        const data = await schema[
          resolverOptions.mode === "sync" ? "parse" : "parseAsync"
        ](values, schemaOptions);

        options.shouldUseNativeValidation &&
          validateFieldsNatively({}, options);

        return {
          errors: {},
          values: resolverOptions.raw ? Object.assign({}, values) : data,
        };
      } catch (error) {
        if (isZod3Error(error)) {
          return {
            values: {},
            errors: toNestErrors(
              parseZod3Issues(
                error.errors,
                !options.shouldUseNativeValidation &&
                  options.criteriaMode === "all",
              ),
              options,
            ),
          };
        }

        throw error;
      }
    };
  }

  if (isZod4Schema(schema)) {
    return async (values, _, options) => {
      try {
        const parseFn =
          resolverOptions.mode === "sync" ? z4.parse : z4.parseAsync;
        const data = await parseFn(schema, values, schemaOptions);

        options.shouldUseNativeValidation &&
          validateFieldsNatively({}, options);

        return {
          errors: {},
          values: resolverOptions.raw ? Object.assign({}, values) : data,
        };
      } catch (error) {
        if (isZod4Error(error)) {
          return {
            values: {},
            errors: toNestErrors(
              parseZod4Issues(
                error.issues,
                !options.shouldUseNativeValidation &&
                  options.criteriaMode === "all",
              ),
              options,
            ),
          };
        }

        throw error;
      }
    };
  }

  throw new Error("Invalid input: not a Zod schema");
}
