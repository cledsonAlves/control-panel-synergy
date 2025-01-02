import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Release } from "@/types/release";
import { useToast } from "@/hooks/use-toast";

interface ReleaseTableProps {
  releases: Release[];
  onUpdateRelease: (release: Release) => void;
}

export const ReleaseTable = ({ releases, onUpdateRelease }: ReleaseTableProps) => {
  const { toast } = useToast();

  const handleChange = (release: Release, field: keyof Release, value: string) => {
    const updatedRelease = { ...release, [field]: value };
    onUpdateRelease(updatedRelease);
    toast({
      title: "Release atualizada",
      description: `Campo ${field} atualizado com sucesso.`,
    });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Releases</TableHead>
            <TableHead>Plataforma</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Rollout</TableHead>
            <TableHead>Versão</TableHead>
            <TableHead>Observação</TableHead>
            <TableHead>Data de corte</TableHead>
            <TableHead>Horário de corte</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Início do regressivo</TableHead>
            <TableHead>Fim do regressivo</TableHead>
            <TableHead>GMUD centralizadora</TableHead>
            <TableHead>Envio Alpha</TableHead>
            <TableHead>Início da distribuição</TableHead>
            <TableHead>Fim da distribuição</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {releases.map((release) => (
            <TableRow key={`${release.id}-${release.platform}`}>
              <TableCell>{release.id}</TableCell>
              <TableCell>{release.platform}</TableCell>
              <TableCell>
                <Input
                  value={release.status}
                  onChange={(e) => handleChange(release, "status", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  value={release.rollout}
                  onChange={(e) => handleChange(release, "rollout", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  value={release.version}
                  onChange={(e) => handleChange(release, "version", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  value={release.observation}
                  onChange={(e) => handleChange(release, "observation", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  type="date"
                  value={release.cutDate}
                  onChange={(e) => handleChange(release, "cutDate", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  type="time"
                  value={release.cutTime}
                  onChange={(e) => handleChange(release, "cutTime", e.target.value)}
                />
              </TableCell>
              <TableCell>{release.type}</TableCell>
              <TableCell>
                <Input
                  type="date"
                  value={release.regressionStart}
                  onChange={(e) => handleChange(release, "regressionStart", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  type="date"
                  value={release.regressionEnd}
                  onChange={(e) => handleChange(release, "regressionEnd", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  value={release.gmudCentralizer}
                  onChange={(e) => handleChange(release, "gmudCentralizer", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  type="date"
                  value={release.alphaSubmission}
                  onChange={(e) => handleChange(release, "alphaSubmission", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  type="date"
                  value={release.distributionStart}
                  onChange={(e) => handleChange(release, "distributionStart", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  type="date"
                  value={release.distributionEnd}
                  onChange={(e) => handleChange(release, "distributionEnd", e.target.value)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};