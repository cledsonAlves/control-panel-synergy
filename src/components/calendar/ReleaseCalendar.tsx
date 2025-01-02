import { useState } from "react";
import { ReleaseCalendarHeader } from "./ReleaseCalendarHeader";
import { ReleaseTable } from "./ReleaseTable";
import { Release } from "@/types/release";

const initialReleases: Release[] = [
  {
    id: "R118",
    platform: "Android",
    status: "Planejada",
    rollout: "0%",
    version: "2.63.0",
    observation: "---",
    cutDate: "2025-01-06",
    cutTime: "09:00",
    type: "Normal",
    regressionStart: "2025-01-07",
    regressionEnd: "2025-01-08",
    gmudCentralizer: "---",
    alphaSubmission: "2025-01-09",
    distributionStart: "2025-01-10",
    distributionEnd: "2025-01-16",
  },
  {
    id: "R118",
    platform: "iOS",
    status: "Planejada",
    rollout: "0%",
    version: "3.66.0",
    observation: "---",
    cutDate: "2025-01-06",
    cutTime: "09:00",
    type: "Normal",
    regressionStart: "2025-01-07",
    regressionEnd: "2025-01-08",
    gmudCentralizer: "---",
    alphaSubmission: "2025-01-09",
    distributionStart: "2025-01-10",
    distributionEnd: "2025-01-16",
  },
  // Add more initial releases as needed
];

export const ReleaseCalendar = () => {
  const [releases, setReleases] = useState<Release[]>(initialReleases);

  const handleMonthChange = (date: Date) => {
    // In a real application, this would fetch releases for the selected month
    console.log("Selected month:", date);
  };

  const handleUpdateRelease = (updatedRelease: Release) => {
    setReleases(prev =>
      prev.map(release =>
        release.id === updatedRelease.id && release.platform === updatedRelease.platform
          ? updatedRelease
          : release
      )
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <ReleaseCalendarHeader onMonthChange={handleMonthChange} />
      <div className="p-4">
        <ReleaseTable releases={releases} onUpdateRelease={handleUpdateRelease} />
      </div>
    </div>
  );
};

export default ReleaseCalendar;