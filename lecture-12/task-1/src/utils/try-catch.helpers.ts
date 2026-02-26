type TryCatchSuccess<T> = {
  data: T;
  error?: undefined;
};

type TryCatchError<E = Error> = {
  data?: undefined;
  error: E;
};

type TryCatchResult<T, E = Error> = TryCatchSuccess<T> | TryCatchError<E>;

export const tryCatchAsync = async <T, E = Error>(
  promise: Promise<T>,
): Promise<TryCatchResult<T, E>> => {
  try {
    const result = await promise;
    return { data: result };
  } catch (error) {
    return { error: error as E };
  }
};

export const tryCatch = <T, E = Error>(fn: () => unknown): TryCatchResult<T, E> => {
  try {
    const result = fn();
    return { data: result as T };
  } catch (error) {
    return { error: error as E };
  }
};
