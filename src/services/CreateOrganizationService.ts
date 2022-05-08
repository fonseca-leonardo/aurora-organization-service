import OrganizationRepository from '@infra/repositories/OrganizationRepository';
import AddressRepository from '@infra/repositories/AddressRepository';

interface IRequest {
  organization: {
    name: string;
    phone?: string;
    description?: string;
  };
  address?: {
    street?: string;
    streetNumber?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    extra?: string;
  };
}

export default class CreateOrganizationService {
  private organizationRepository = new OrganizationRepository();
  private addressRepository = new AddressRepository();

  public async execute({ organization, address }: IRequest) {
    const newOrganization = await this.organizationRepository.create(
      organization,
    );

    const newAddress = await this.addressRepository.create({
      ...address,
      organizationId: newOrganization.id,
    });

    return {
      organization: newOrganization,
      address: newAddress,
    };
  }
}
