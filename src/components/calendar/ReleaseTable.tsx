import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "em alpha":
        return "bg-blue-200";
      case "concluída":
        return "bg-green-200";
      case "cancelada":
        return "bg-red-200";
      case "em distribuição":
        return "bg-cyan-200";
      case "aguardando aprovação na loja":
        return "bg-orange-200";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader className="bg-[#1B3B36]">
          <TableRow>
            <TableHead className="text-white">Releases</TableHead>
            <TableHead className="text-white">Plataforma</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-white">Rollout</TableHead>
            <TableHead className="text-white">Versão</TableHead>
            <TableHead className="text-white">Observação</TableHead>
            <TableHead className="text-white">Data de corte</TableHead>
            <TableHead className="text-white">Horário de corte</TableHead>
            <TableHead className="text-white">Tipo</TableHead>
            <TableHead className="text-white">Início do regressivo</TableHead>
            <TableHead className="text-white">Fim do regressivo</TableHead>
            <TableHead className="text-white">GMUD centralizadora</TableHead>
            <TableHead className="text-white">Envio Alpha</TableHead>
            <TableHead className="text-white">Início da distribuição</TableHead>
            <TableHead className="text-white">Fim da distribuição</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {releases.map((release, index) => (
            <TableRow key={`${release.id}-${release.platform}`} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
              <TableCell>{release.id}</TableCell>
              <TableCell>
                <Select value={release.platform} onValueChange={(value) => handleChange(release, "platform", value)}>
                  <SelectTrigger>
                    <SelectValue>{release.platform}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Android">Android</SelectItem>
                    <SelectItem value="iOS">iOS</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Select 
                  value={release.status} 
                  onValueChange={(value) => handleChange(release, "status", value)}
                >
                  <SelectTrigger className={getStatusColor(release.status)}>
                    <SelectValue>{release.status}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Planejada">Planejada</SelectItem>
                    <SelectItem value="Em alpha">Em alpha</SelectItem>
                    <SelectItem value="Concluída">Concluída</SelectItem>
                    <SelectItem value="Cancelada">Cancelada</SelectItem>
                    <SelectItem value="Em distribuição">Em distribuição</SelectItem>
                    <SelectItem value="Aguardando Aprovação na Loja">Aguardando Aprovação na Loja</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Input
                  value={release.rollout}
                  onChange={(e) => handleChange(release, "rollout", e.target.value)}
                  className="w-20"
                />
              </TableCell>
              <TableCell>
                <Input
                  value={release.version}
                  onChange={(e) => handleChange(release, "version", e.target.value)}
                  className="w-24"
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
              <TableCell>
                <Select value={release.type} onValueChange={(value) => handleChange(release, "type", value)}>
                  <SelectTrigger>
                    <SelectValue>{release.type}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Normal">Normal</SelectItem>
                    <SelectItem value="Hotfix">Hotfix</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
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