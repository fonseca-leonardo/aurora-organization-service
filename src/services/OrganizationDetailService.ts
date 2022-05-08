import OrganizationRepository from '@infra/repositories/OrganizationRepository';
import ServerError from '@shared/errors/ServerError';

interface IRequest {
  organizationId?: string | null;
}

export default class OrganizationDetailService {
  private organizationRepository = new OrganizationRepository();

  public async execute({ organizationId }: IRequest) {
    if (!organizationId) {
      throw new ServerError('Organization not found');
    }

    const organization = await this.organizationRepository.findById(
      organizationId,
    );

    if (!organization) {
      throw new ServerError('Organization not found');
    }

    const { id, name, logo, phone, description } = organization;

    return {
      id,
      name,
      ...(logo && { logo: `${process.env.STORAGE_URL}/${logo}` }),
      phone,
      description,
    };
  }
}
