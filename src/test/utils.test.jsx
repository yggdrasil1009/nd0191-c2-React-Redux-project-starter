import { formatDate } from "../utils/ConvertUtils";

describe("formatDate", () => {
  const fixedTimestamp = 1493579767190;

  it("should format a fixed timestamp correctly for AM times", () => {
    expect(formatDate(fixedTimestamp)).toBe("2:16 AM | 05/01/2017");
  });

  it("should format a fixed timestamp correctly for PM times", () => {
    const pmTimestamp = fixedTimestamp + 6 * 60 * 60 * 1000;
    expect(formatDate(pmTimestamp)).toBe("8:16 AM | 05/01/2017");
  });

  it("should handle midnight correctly with a fixed timestamp", () => {
    const midnightTimestamp = 1493596800000;
    expect(formatDate(midnightTimestamp)).toBe("7:00 AM | 05/01/2017");
  });

  it("should handle noon correctly with a fixed timestamp", () => {
    const noonTimestamp = 1493553600000;
    expect(formatDate(noonTimestamp)).toBe("7:00 PM | 04/30/2017");
  });

  it("should format single-digit hours and minutes correctly with a fixed timestamp", () => {
    const earlyMorningTimestamp = 1493538300000;
    expect(formatDate(earlyMorningTimestamp)).toBe("2:45 PM | 04/30/2017");
  });

  it("should format a future fixed timestamp correctly", () => {
    const futureTimestamp = 1893579767190;
    expect(formatDate(futureTimestamp)).toBe("5:22 PM | 01/02/2030");
  });

  it("should format a past fixed timestamp correctly", () => {
    const pastTimestamp = 1293579767190;
    expect(formatDate(pastTimestamp)).toBe("6:42 AM | 12/29/2010");
  });
});
