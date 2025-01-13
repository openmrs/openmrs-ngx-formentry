export interface Identifier {
  uuid?: string;
  identifier: string;
  identifierType: OpenmrsResource;
  location: OpenmrsResource;
}

interface OpenmrsResource {
  display: string;
  uuid: string;
  links?: Array<{ rel: string; uri: string }>;
}
