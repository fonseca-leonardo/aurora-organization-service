import ICreateOrganizationDTO from '@dtos/ICreateOrganizationDTO';
import prisma from '@shared/database/prisma';

export default class OrganizationRepository {
  private organizationRepository = prisma.organization;

  public async findById(id: string) {
    const organization = await this.organizationRepository.findFirst({
      where: {
        id,
      },
    });

    return organization;
  }

  public async create({ name, description, phone }: ICreateOrganizationDTO) {
    const organization = await this.organizationRepository.create({
      data: {
        name,
        description,
        phone,
      },
    });

    return organization;
  }

  public async updateLogo(id: string, logo: string) {
    const organization = await this.organizationRepository.update({
      where: {
        id,
      },
      data: {
        logo,
      },
    });

    return organization;
  }
}
