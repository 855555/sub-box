import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getClashConfigs } from "./actions";
import { ClashConfigTable } from "./clash-config-table";
import { CreateClashConfigDialog } from "./create-clash-config-dialog";

export default async function ClashConfigsPage() {
  const configs = await getClashConfigs();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-y-0 pb-4">
        <div className="flex items-center gap-4">
          <CardTitle>Clash 配置 ({configs.length})</CardTitle>
          <CreateClashConfigDialog />
        </div>
      </CardHeader>
      <CardContent>
        <ClashConfigTable configs={configs} />
      </CardContent>
    </Card>
  );
}
