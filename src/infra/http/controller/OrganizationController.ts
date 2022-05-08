import errorMessages from '@constants/errorMessages';
import successMessages from '@constants/successMessages';
import CreateOrganizationService from '@services/CreateOrganizationService';
import OrganizationDetailService from '@services/OrganizationDetailService';
import UploadOrganizationLogoService from '@services/UploadOrganizationLogoService';
import { Request, Response } from 'express';

export default class OrganizationController {
  public async index(request: Request, response: Response) {
    const { id } = request.params;

    const organizationDetail = new OrganizationDetailService();

    const detail = await organizationDetail.execute({ organizationId: id });

    return response.formatedJson(detail);
  }

  public async store(request: Request, response: Response) {
    const { organization, address } = request.body;

    const createOrganization = new CreateOrganizationService();

    const newArganization = await createOrganization.execute({
      organization,
      address,
    });

    return response.formatedJson(newArganization, {
      message: successMessages.ORGANIZATION_CREATED,
    });
  }

  public async logoUpload(request: Request, response: Response) {
    const { organizationId } = request.authData;

    const file = request.file;

    const uploadLogo = new UploadOrganizationLogoService();

    await uploadLogo.execute({ file, organizationId });

    return response.formatedJson(
      {},
      { message: successMessages.LOGO_UPLOADED },
    );
  }
}
