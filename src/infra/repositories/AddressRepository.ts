import ICreateAddressDTO from '@dtos/ICreateAddressDTO';
import prisma from '@shared/database/prisma';

export default class AddressRepository {
  private addressRepository = prisma.address;

  public async create({
    city,
    extra,
    neighborhood,
    state,
    street,
    streetNumber,
    zipCode,
    organizationId,
  }: ICreateAddressDTO) {
    const address = await this.addressRepository.create({
      data: {
        city,
        extra,
        neighborhood,
        state,
        street,
        streetNumber,
        zipCode,
        organizationId,
      },
    });

    return address;
  }
}
