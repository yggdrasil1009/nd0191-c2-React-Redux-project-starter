import { formatDate } from "../utils/ConvertUtils";

describe("formatDate", () => {
  it("should format a timestamp correctly for AM times", () => {
    const timestamp = new Date("2024-10-01T09:30:00Z").getTime();
    expect(formatDate(timestamp)).toBe("9:30 AM | 10/01/2024");
  });

  it("should format a timestamp correctly for PM times", () => {
    const timestamp = new Date("2024-10-01T15:45:00Z").getTime();
    expect(formatDate(timestamp)).toBe("3:45 PM | 10/01/2024");
  });

  it("should handle midnight correctly", () => {
    const timestamp = new Date("2024-10-01T00:00:00Z").getTime();
    expect(formatDate(timestamp)).toBe("12:00 AM | 10/01/2024");
  });

  it("should handle noon correctly", () => {
    const timestamp = new Date("2024-10-01T12:00:00Z").getTime();
    expect(formatDate(timestamp)).toBe("12:00 PM | 10/01/2024");
  });

  it("should format single-digit hours and minutes correctly", () => {
    const timestamp = new Date("2024-10-01T05:05:00Z").getTime();
    expect(formatDate(timestamp)).toBe("5:05 AM | 10/01/2024");
  });

  it("should format a timestamp in the future correctly", () => {
    const timestamp = new Date("2025-10-01T10:30:00Z").getTime();
    expect(formatDate(timestamp)).toBe("10:30 AM | 10/01/2025");
  });

  it("should format a timestamp in the past correctly", () => {
    const timestamp = new Date("2023-01-01T22:15:00Z").getTime();
    expect(formatDate(timestamp)).toBe("10:15 PM | 01/01/2023");
  });
});
