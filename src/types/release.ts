export interface Release {
  id: string;
  platform: "Android" | "iOS";
  status: string;
  rollout: string;
  version: string;
  observation: string;
  cutDate: string;
  cutTime: string;
  type: "Normal" | "Hotfix";
  regressionStart: string;
  regressionEnd: string;
  gmudCentralizer: string;
  alphaSubmission: string;
  distributionStart: string;
  distributionEnd: string;
}