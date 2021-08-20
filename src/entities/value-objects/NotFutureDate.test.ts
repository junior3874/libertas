import { FutureDateError } from "../errors";
import { NotFutureDate } from "./NotFutureDate";

describe("NoFutureDate", () => {
  it("should throw FutureDateError if date is in the future", () => {
    const now = new Date();
    const msInDay = 86400 * 1000;
    const msOfTomorrow = now.getTime() + msInDay;
    const tomorrow = new Date(msOfTomorrow);

    expect(() => new NotFutureDate(tomorrow)).toThrow(
      new FutureDateError(tomorrow)
    );
  });

  it("should instantiate object because date is in the past", () => {
    const now = new Date();
    const msInDay = 86400 * 1000;
    const msOfYesterday = now.getTime() - msInDay;
    const yesterday = new Date(msOfYesterday);

    const sut = new NotFutureDate(yesterday);

    expect(sut.value).toBe(yesterday);
  });

  it("should instantiate object because date is the present time", () => {
    const now = new Date();

    const sut = new NotFutureDate(now);

    expect(sut.value).toBe(now);
  });
});
