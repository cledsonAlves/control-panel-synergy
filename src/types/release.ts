export interface Release {
  id: string;
  platform: "Android" | "iOS";
  status: "Planejada" | "Em alpha" | "Concluída" | "Cancelada" | "Em distribuição" | "Aguardando Aprovação na Loja";
  rollout: string;
  version: string;
  observation: string;
  cutDate: string;
  cutTime: string;
  type: "Normal";
  regressionStart: string;
  regressionEnd: string;
  gmudCentralizer: string;
  alphaSubmission: string;
  distributionStart: string;
  distributionEnd: string;
}