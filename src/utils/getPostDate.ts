import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { SITE } from "@/config";

dayjs.extend(utc);
dayjs.extend(timezone);

type PostDateInput = {
  pubDatetime: string | Date;
  modDatetime?: string | Date | null;
  timezone?: string;
};

export type PostDate = {
  isModified: boolean;
  iso: string;
  label: string;
};

export function getPostDate({
  pubDatetime,
  modDatetime,
  timezone: postTimezone,
}: PostDateInput): PostDate {
  const isModified = !!modDatetime && modDatetime > pubDatetime;
  const datetime = dayjs(isModified ? modDatetime : pubDatetime).tz(
    postTimezone || SITE.timezone
  );

  return {
    isModified,
    iso: datetime.toISOString(),
    label: datetime.format("MMMM D, YYYY"),
  };
}
