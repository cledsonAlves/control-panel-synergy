import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type ReleaseStatus = {
  id: string;
  platform: string;
  stage: string;
  status: string;
};

const releases: ReleaseStatus[] = [
  {
    id: "R113",
    platform: "iOS",
    stage: "Testes Alpha",
    status: "Em Progresso",
  },
  {
    id: "R114",
    platform: "Android",
    stage: "Preparando Alpha",
    status: "Em Progresso",
  },
];

export const OngoingReleases = () => {
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Releases em Andamento</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="android">Android</TabsTrigger>
              <TabsTrigger value="ios">iOS</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              {releases.map((release) => (
                <div
                  key={`${release.platform}-${release.id}`}
                  className="flex items-center justify-between p-4 bg-white rounded-lg border"
                >
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="font-medium">{release.platform} - {release.id}</h3>
                      <p className="text-sm text-gray-500">{release.stage}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                      {release.status}
                    </Badge>
                    <Button variant="outline" className="text-green-600 border-green-200 hover:bg-green-50">
                      Visualizar
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="android" className="space-y-4">
              {releases
                .filter((release) => release.platform === "Android")
                .map((release) => (
                  <div
                    key={`${release.platform}-${release.id}`}
                    className="flex items-center justify-between p-4 bg-white rounded-lg border"
                  >
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="font-medium">{release.platform} - {release.id}</h3>
                        <p className="text-sm text-gray-500">{release.stage}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        {release.status}
                      </Badge>
                      <Button variant="outline" className="text-green-600 border-green-200 hover:bg-green-50">
                        Visualizar
                      </Button>
                    </div>
                  </div>
                ))}
            </TabsContent>
            <TabsContent value="ios" className="space-y-4">
              {releases
                .filter((release) => release.platform === "iOS")
                .map((release) => (
                  <div
                    key={`${release.platform}-${release.id}`}
                    className="flex items-center justify-between p-4 bg-white rounded-lg border"
                  >
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="font-medium">{release.platform} - {release.id}</h3>
                        <p className="text-sm text-gray-500">{release.stage}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        {release.status}
                      </Badge>
                      <Button variant="outline" className="text-green-600 border-green-200 hover:bg-green-50">
                        Visualizar
                      </Button>
                    </div>
                  </div>
                ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};