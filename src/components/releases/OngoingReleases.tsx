import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

type ReleaseStatus = {
  id: string;
  platform: string;
  stage: string;
  status: string;
  isActive: boolean;
};

const releases: ReleaseStatus[] = [
  {
    id: "R116",
    platform: "iOS",
    stage: "Testes Alpha",
    status: "Em Progresso",
    isActive: true,
  },
  {
    id: "R116",
    platform: "Android",
    stage: "Preparando Alpha",
    status: "Em Progresso",
    isActive: true,
  },
  {
    id: "R117",
    platform: "iOS",
    stage: "Testes Alpha",
    status: "Em Progresso",
    isActive: false,
  },
  {
    id: "R117",
    platform: "Android",
    stage: "Preparando Alpha",
    status: "Em Progresso",
    isActive: false,
  },
];

export const OngoingReleases = () => {
  const { toast } = useToast();

  const handleStatusChange = (releaseId: string, platform: string, newStatus: boolean) => {
    // Aqui você implementaria a lógica para atualizar o status na API/GitHub
    toast({
      title: "Status atualizado",
      description: `Release ${platform}-${releaseId} ${newStatus ? 'ativada' : 'desativada'}`,
    });
  };

  const ReleaseCard = ({ release }: { release: ReleaseStatus }) => (
    <div
      key={`${release.platform}-${release.id}`}
      className="flex items-center justify-between p-4 bg-white rounded-lg border"
    >
      <div className="flex items-center space-x-4">
        <div>
          <h3 className="font-medium">[{release.platform}]-{release.id}</h3>
          <p className="text-sm text-gray-500">{release.stage}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Switch
            checked={release.isActive}
            onCheckedChange={(checked) => handleStatusChange(release.id, release.platform, checked)}
          />
          <span className="text-sm text-gray-500">
            {release.isActive ? 'Ativado' : 'Desativado'}
          </span>
        </div>
        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
          {release.status}
        </Badge>
        <Button variant="outline" className="text-green-600 border-green-200 hover:bg-green-50">
          Visualizar
        </Button>
      </div>
    </div>
  );

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
                <ReleaseCard key={`${release.platform}-${release.id}`} release={release} />
              ))}
            </TabsContent>
            <TabsContent value="android" className="space-y-4">
              {releases
                .filter((release) => release.platform === "Android")
                .map((release) => (
                  <ReleaseCard key={`${release.platform}-${release.id}`} release={release} />
                ))}
            </TabsContent>
            <TabsContent value="ios" className="space-y-4">
              {releases
                .filter((release) => release.platform === "iOS")
                .map((release) => (
                  <ReleaseCard key={`${release.platform}-${release.id}`} release={release} />
                ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};