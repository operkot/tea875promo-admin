import { useFetchClient, useNotification, useAPIErrorHandler } from "@strapi/strapi/admin";
import { unstable_useContentManagerContext as useContentManagerContext } from '@strapi/strapi/admin'
import { Button } from "@strapi/design-system";
import { Download } from "@strapi/icons";

const ExportButton = () => {
  const { get } = useFetchClient();
  const { model, id } = useContentManagerContext();
  const { toggleNotification } = useNotification();
  const { formatAPIError } = useAPIErrorHandler();

  const handleExport = async () => {
    try {
      const { data } = await get(`/content-manager/collection-types/${model}/${id}?populate=*`);
      const preparedData = (({ title, requests }) => {
        const preparedRequests = requests
        .filter((request: any) => request.request_status === 'approved' )
        .map((request: any) => request.tg_username)

        return { title, participants: preparedRequests }
      })(data.data)

      const jsonString = JSON.stringify(preparedData, null, 2);
      
      const blob = new Blob([jsonString], { 
        type: 'application/json;charset=utf-8' 
      });
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `export_${preparedData.title}_${new Date().toISOString()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toggleNotification({
        type: 'success',
        message: 'Экспорт успешно завершен',
      });
    } catch (error: any) {
      toggleNotification({
        type: 'warning',
        message: formatAPIError(error),
      });
    }
  }

  return model === 'api::promotion.promotion' ? (
    <Button variant="primary" startIcon={<Download />} onClick={handleExport}>
      Экспортировать участников
    </Button>
  ) : null
}

export default ExportButton