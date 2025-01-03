import { useState, useEffect } from "react";
import { ReleaseCalendarHeader } from "@/components/calendar/ReleaseCalendarHeader";
import { ReleaseTable } from "@/components/calendar/ReleaseTable";
import { Release } from "@/types/release";

export const ReleaseCalendar = () => {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReleasesFromGitHub = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://api.github.com/repos/cledsonAlves/control-panel-synergy/issues/2",
          {
            headers: {
              Authorization: `Bearer ${process.env.GITHUB_GENERIC_TOKEN}`, // Substitua pelo token pessoal do GitHub
              Accept: "application/vnd.github.v3+json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }

        const issueData = await response.json();

        // Extraia os releases do corpo da issue (assumindo um formato JSON válido no corpo da issue)
        const parsedReleases = JSON.parse(issueData.body);

        setReleases(parsedReleases);
      } catch (error) {
        console.error("Error fetching releases:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReleasesFromGitHub();
  }, []);

  const handleMonthChange = (date: Date) => {
    console.log("Selected month:", date);
    // Atualize a lógica aqui se precisar filtrar os releases pelo mês
  };

  const handleUpdateRelease = (updatedRelease: Release) => {
    setReleases((prev) =>
      prev.map((release) =>
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
        {loading ? (
          <p>Loading releases...</p>
        ) : (
          <ReleaseTable releases={releases} onUpdateRelease={handleUpdateRelease} />
        )}
      </div>
    </div>
  );
};

export default ReleaseCalendar;
