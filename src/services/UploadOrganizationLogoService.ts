import errorMessages from '@constants/errorMessages';
import OrganizationRepository from '@infra/repositories/OrganizationRepository';
import StorageProvider from '@shared/container/providers/StorageProvider';
import ServerError from '@shared/errors/ServerError';

interface IRequest {
  organizationId?: string | null;

  file?: Express.Multer.File;
}

export default class UploadOrganizationLogoService {
  private storageProvider = new StorageProvider();
  private organizationRepository = new OrganizationRepository();

  public async execute({ organizationId, file }: IRequest) {
    if (!file) {
      throw new ServerError(errorMessages.INTERNAL_SERVER_ERROR);
    }

    if (!organizationId) {
      throw new ServerError(errorMessages.ORGANIZATION_NOT_FOUND);
    }

    const organization = await this.organizationRepository.findById(
      organizationId,
    );

    if (!organization) {
      throw new ServerError(errorMessages.ORGANIZATION_NOT_FOUND);
    }

    if (organization.logo) {
      await this.storageProvider.deleteFile(organization.logo);
    }

    await this.storageProvider.saveFile(file.filename, {
      folder: `organizations/${organizationId}/logo`,
      makePublic: true,
    });

    await this.organizationRepository.updateLogo(
      organizationId,
      `organizations/${organizationId}/logo/${file.filename}`,
    );
  }
}
