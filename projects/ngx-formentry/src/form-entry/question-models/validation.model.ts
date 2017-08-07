
export class ValidationModel {

  type: string;

  message: string;

  constructor(validations: any) {

    this.type = validations.type;
    this.message = validations.message || null;
  }
}
