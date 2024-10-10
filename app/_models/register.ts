export type RegisterDTO = {
  username: string;
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  companyName?: string;
  branch?: string;
  position?: string;
  region?: string;
};

export default class RegisterModel {
  username: string;
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  companyName?: string;
  branch?: string;
  position?: string;
  region?: string;

  constructor(
    username: string,
    email: string,
    password: string,
    name: string,
    phoneNumber: string,
    companyName?: string,
    branch?: string,
    position?: string,
    region?: string
  ) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.companyName = companyName;
    this.branch = branch;
    this.position = position;
    this.region = region;
  }

  static fromJson(dto: RegisterDTO): RegisterModel {
    return new RegisterModel(
      dto.username,
      dto.email,
      dto.password,
      dto.name,
      dto.phoneNumber,
      dto.companyName,
      dto.branch,
      dto.position,
      dto.region
    );
  }

  toJson(): RegisterDTO {
    return {
      username: this.username,
      email: this.email,
      password: this.password,
      name: this.name,
      phoneNumber: this.phoneNumber,
      companyName: this.companyName,
      branch: this.branch,
      position: this.position,
      region: this.region,
    };
  }

  static empty(): RegisterModel {
    return new RegisterModel("", "", "", "", "");
  }
}
