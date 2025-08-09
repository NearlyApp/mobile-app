import { ErrorData } from '@/types/requester';

export default class RequesterError<
  E extends ErrorData = ErrorData,
> extends Error {
  public readonly status: number;
  public readonly data: E;

  constructor(data: E) {
    super(data.message);

    this.name = data.error;
    this.status = data.statusCode;
    this.data = data;
  }
}
