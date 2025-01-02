import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface Release {
  id: string;
  platform: string;
  status: {
    pacotes: string;
    releaseNotes: string;
    recebendoPacotes: string;
    preparandoVersao: string;
    testesRegressivo: string;
    preparandoAlpha: string;
    testesAlpha: string;
    distribuicao: string;
  };
}

interface Version {
  id: string;
  platform: string;
  version: string;
  type: string;
  status: string;
  rollout: string;
  conclusion: string;
  size: string;
}

const Admin = () => {
  const { toast } = useToast();
  const [releases, setReleases] = useState<Release[]>([
    {
      id: "[iOS]-R116",
      platform: "iOS",
      status: {
        pacotes: "visualizar",
        releaseNotes: "visualizar",
        recebendoPacotes: "✓ pacote fechado",
        preparandoVersao: "✓ concluído",
        testesRegressivo: "✓ concluído",
        preparandoAlpha: "✓ concluído",
        testesAlpha: "✓ concluído",
        distribuicao: "✓ concluído",
      },
    },
    // Add more initial releases as needed
  ]);

  const [versions, setVersions] = useState<Version[]>([
    {
      id: "[Android]-R117",
      platform: "Android",
      version: "2.62.0",
      type: "Release normal",
      status: "Concluída",
      rollout: "100%",
      conclusion: "27/12/2024",
      size: "108mb",
    },
    // Add more initial versions as needed
  ]);

  const handleSaveRelease = (release: Release) => {
    setReleases(prev => prev.map(r => r.id === release.id ? release : r));
    toast({
      title: "Release atualizada",
      description: `Release ${release.id} foi atualizada com sucesso.`,
    });
  };

  const handleSaveVersion = (version: Version) => {
    setVersions(prev => prev.map(v => v.id === version.id ? version : v));
    toast({
      title: "Versão atualizada",
      description: `Versão ${version.id} foi atualizada com sucesso.`,
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Painel Administrativo</h1>
        <Button variant="outline" onClick={() => window.history.back()}>
          Voltar
        </Button>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Releases em andamento</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Release</TableHead>
                <TableHead>Pacotes</TableHead>
                <TableHead>Release Notes</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {releases.map((release) => (
                <TableRow key={release.id}>
                  <TableCell>{release.id}</TableCell>
                  <TableCell>
                    <Input 
                      value={release.status.pacotes}
                      onChange={(e) => {
                        const updatedRelease = {
                          ...release,
                          status: { ...release.status, pacotes: e.target.value }
                        };
                        handleSaveRelease(updatedRelease);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Input 
                      value={release.status.releaseNotes}
                      onChange={(e) => {
                        const updatedRelease = {
                          ...release,
                          status: { ...release.status, releaseNotes: e.target.value }
                        };
                        handleSaveRelease(updatedRelease);
                      }}
                    />
                  </TableCell>
                  <TableCell>{release.status.recebendoPacotes}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleSaveRelease(release)}>
                      Salvar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Versões distribuídas</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Release</TableHead>
                <TableHead>Plataforma</TableHead>
                <TableHead>Versão</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Rollout</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {versions.map((version) => (
                <TableRow key={version.id}>
                  <TableCell>{version.id}</TableCell>
                  <TableCell>
                    <Input 
                      value={version.platform}
                      onChange={(e) => {
                        const updatedVersion = {
                          ...version,
                          platform: e.target.value
                        };
                        handleSaveVersion(updatedVersion);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Input 
                      value={version.version}
                      onChange={(e) => {
                        const updatedVersion = {
                          ...version,
                          version: e.target.value
                        };
                        handleSaveVersion(updatedVersion);
                      }}
                    />
                  </TableCell>
                  <TableCell>{version.status}</TableCell>
                  <TableCell>{version.rollout}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleSaveVersion(version)}>
                      Salvar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </div>
    </div>
  );
};

export default Admin;