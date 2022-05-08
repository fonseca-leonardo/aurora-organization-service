export default interface ICreateAddressDTO {
  organizationId: string;
  street?: string;
  streetNumber?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  extra?: string;
}
