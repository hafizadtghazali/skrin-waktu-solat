"use client"

import { useEffect, useState } from "react"
import { getNextPrayer } from "@/services/PrayerTimeService"
import { DailyPrayerTime } from "@/types/DailyPrayerTimeType"
import moment from "moment"

export default function PrayerTimes({
  today,
  tomorrow,
}: {
  today: DailyPrayerTime
  tomorrow: DailyPrayerTime
}) {
  const PrayerTimesArray = [
    {
      label: "Subuh",
      data: today.fajr,
      tomorrow: tomorrow.fajr,
    },
    {
      label: "Zohor",
      data: today.zuhr,
      tomorrow: tomorrow.zuhr,
    },
    {
      label: "Asar",
      data: today.asr,
      tomorrow: tomorrow.asr,
    },
    {
      label: "Maghrib",
      data: today.maghrib,
      tomorrow: tomorrow.maghrib,
    },
    {
      label: "Isyak",
      data: today.isha,
      tomorrow: tomorrow.isha,
    },
  ]

  const [nextPrayerTime, setNextPrayerTime] = useState(getNextPrayer(today))

  useEffect(() => {
    const interval = setInterval(() => {
      setNextPrayerTime(getNextPrayer(today))
    }, 60 * 1000)

    return () => clearInterval(interval)
  }, [today])

  return (
    <table className="text-white mx-auto table-auto border-collapse border-none w-full">
      <thead>
        <tr
          className="text-center [&>*]:p-2 md:[&>*]:p-8
          md:[&>*]:border [&>*]:border-mosque-dark
          [&>th]:border-t-0 [&>th:last-of-type]:border-r-0"
        >
          <th className="sr-only">Waktu solat</th>
          <th className="md:text-5xl">Mula</th>
          <th className="md:text-5xl">Esok</th>
        </tr>
      </thead>
      <tbody>
        {PrayerTimesArray.map((prayer, index) => (
          <tr
            key={prayer.label}
            className="
              text-center
              [&>*]:p-4
              md:[&>*]:p-8
              md:[&>*]:border md:[&>*]:border-b-0 [&>*]:border-mosque-dark
              md:[&>th]:w-20
              [&>th]:border-l-0
              [&>td:last-of-type]:border-r-0
              border border-mosque-dark border-l-0 border-r-0
              last-of-type:border-b-0"
          >
            <th className="text-left text-xl md:text-5xl md:text-right">
              {prayer.label}
            </th>
            <td className="text-xl md:text-6xl">
              <span
                className={
                  nextPrayerTime.today === true &&
                  nextPrayerTime.prayerIndex === index
                    ? "underline decoration-mosque-highlight underline-offset-8"
                    : ""
                }
              >
                {moment(prayer.data.start, ["HH:mm"]).format("h:mm")}
                </span>
            </td>
            <td className={`text-xl md:text-6xl`}>
              <span
                className={
                  nextPrayerTime.today === false &&
                  nextPrayerTime.prayerIndex === index
                    ? "underline decoration-mosque-highlight underline-offset-8"
                    : ""
                }
              >
                {moment(prayer.tomorrow.congregation_start, ["HH:mm"]).format(
                  "h:mm",
                )}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
