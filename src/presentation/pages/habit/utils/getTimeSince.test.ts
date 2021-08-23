import { getTimeSince } from "./getTimeSince";

describe("getDaysSince util function", () => {
  it("should return time elapsed since date", () => {
    const current = new Date("2021-08-23T22:49:21+00:00");
    const previous = new Date("2021-08-22T22:48:20+00:00");

    const daysSince = getTimeSince(previous, current);

    expect(daysSince).toEqual({
      days: 1,
      hours: 0,
      minutes: 1,
      seconds: 1,
    });
  });

  it("should return time elapsed since date", () => {
    const current = new Date("2021-08-23T22:49:21+00:00");
    const previous = new Date("2021-07-20T22:48:20+00:00");

    const daysSince = getTimeSince(previous, current);

    expect(daysSince).toEqual({
      days: 34,
      hours: 0,
      minutes: 1,
      seconds: 1,
    });
  });

  it("should return time elapsed since date", () => {
    const current = new Date("2021-08-23T22:49:21+00:00");
    const previous = new Date("2021-08-20T14:36:01+00:00");

    const daysSince = getTimeSince(previous, current);

    expect(daysSince).toEqual({
      days: 3,
      hours: 8,
      minutes: 13,
      seconds: 20,
    });
  });
});
