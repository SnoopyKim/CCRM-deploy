import { ClientManagementGroupDao } from "../_utils/database/dao/clientManagementGroupDao";
import ManagementGroupModel from "./managementGroup";

  
export const interests = [
    { value: "투자", text: "투자 (주식/펀드)" },
    { value: "저축", text: "저축" },
    { value: "대출", text: "대출" },
    { value: "부동산", text: "부동산" },
    { value: "세금", text: "세금" },
    { value: "여행", text: "여행" },
    { value: "독서", text: "독서" },
    { value: "운동", text: "운동" },
    { value: "건강", text: "건강" },
    { value: "동물", text: "동물" },
    { value: "창업", text: "창업" },
    { value: "은퇴", text: "은퇴" },
];



export type ContactNumber = {
  part1: string;
  part2: string;
  part3: string;
};

export type ResidentRegistrationNumber = {
  part1: string;
  part2: string;
};

// 보험 나이 계산 함수
export function getInsuranceAge(residentNumber: ResidentRegistrationNumber | undefined): number | null {
  try {
    const birthDate = getBirthday(residentNumber);
    if (!birthDate) return null;

    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();

    // 생일이 아직 지나지 않았으면 나이를 1 감소
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    // 6개월 이상이면 +1 적용
    const halfBirthday = getHalfBirthday(residentNumber);
    if (halfBirthday && currentDate >= halfBirthday) {
      age++;
    }

    return age;
  } catch (error) {
    return null;
  }
}

// 상령일 계산 함수
export function getHalfBirthday(residentNumber: ResidentRegistrationNumber|undefined): Date | null {
  if(!residentNumber) return null;
  try {
    const birthDate = getBirthday(residentNumber)
    if(!birthDate) return null;
    // 생일에 6개월을 더해 상령일 계산
    birthDate.setMonth(birthDate.getMonth() + 6);
    return birthDate;
  } catch (error) {
    return null;
  }
}
// 생년월일 계산 함수
export function getBirthday(residentNumber: ResidentRegistrationNumber|undefined): Date | null {
  if(!residentNumber) return null;
  try {
    if (residentNumber.part1.length < 6 || residentNumber.part2.length < 1) {
      throw new Error("Invalid resident registration number: part1 is less than 6 digits");
    }
    const yearPrefix = Number(residentNumber.part2.charAt(0)) < 3 ? "19" : "20";
    const birthYear = parseInt(yearPrefix + residentNumber.part1.slice(0, 2));
    const birthMonth = parseInt(residentNumber.part1.slice(2, 4));
    const birthDay = parseInt(residentNumber.part1.slice(4, 6));
    const birthDate = new Date(birthYear, birthMonth - 1, birthDay);

    // 날짜가 유효하지 않으면 예외 throw
    if (isNaN(birthDate.getTime())) {
      throw new Error("Invalid birth date");
    }
    return  birthDate;
  } catch (error) {
    return null;
  }
}


export type Family = {
  id: number;
  name?: string;
  phone?: string;
  relation?: string;
};

export type Anniversary = {
  id: number;
  name?: string;
  month?: number;
  day?: number;
};

export type Account = {
  id: number;
  name: string;
  number: string;
  isPrimary?: boolean;
};

export type AutoInsurance = {
  id: number;
  company: string;
  year?: number;
  month?: number;
  day?: number;
  memo: string;
};

export type FireInsurance = {
  id: number;
  company: string;
  year?: number;
  month?: number;
  day?: number;
  memo: string;
};


export type ExemptionReductionEndDate = {
  id: number;
  year?: number;
  month?: number;
  day?: number;
  memo: string;
};



export type ClientDTO = Partial<{
  id: number;
  name: string;
  clientType: "관리 고객" | "가망 고객";
  driverLicense: "운전 유" | "운전 무";
  contactNumber: ContactNumber;
  residentRegistrationNumber: ResidentRegistrationNumber;
  occupation: string;
  address: string;
  addressDetail: string;
  interests: string[];
  family: Family[];
  anniversary: Anniversary[];
  bankAccountInfo: Account[];
  notes: string;
  hospitalRecord: string;
  insuranceRecord: string;
  autoInsuranceExpiration: AutoInsurance[];
  fireInsuranceExpiration: FireInsurance[];
  exemptionReductionEndDate: ExemptionReductionEndDate[];
  honorific: string;
  phone: string;
  checked: boolean;
  groupString: string;
}>;

export default class ClientModel {
    id?: number;
    name: string;
    clientType: string;
    driverLicense: string;
    occupation?: string;
    contactNumber: string;
    residentRegistrationNumber: string;
    address?: string;
    addressDetail?: string;
    interests?: string;
    family?: string;
    anniversary?: string;
    bankAccountInfo?: string;
    notes?: string;
    hospitalRecord?: string;
    insuranceRecord?: string;
    autoInsuranceExpiration?: string;
    fireInsuranceExpiration?: string;
    exemptionReductionEndDate?: string;
    honorific?: string;
    createdAt: string;
    updatedAt: string;
    isDeleteChecked?: boolean;
    groupString?: string;
  
    constructor(
      id: number|undefined,
      name: string,
      clientType: string,
      driverLicense: string,
      contactNumber: string,
      residentRegistrationNumber: string,
      createdAt: string,
      updatedAt: string,
      occupation?: string,
      address?: string,
      addressDetail?: string,
      interests?: string,
      family?: string,
      anniversary?: string,
      bankAccountInfo?: string,
      notes?: string,
      hospitalRecord?: string,
      insuranceRecord?: string,
      autoInsuranceExpiration?: string,
      fireInsuranceExpiration?: string,
      exemptionReductionEndDate?: string,
      honorific?: string,
    ) {
      this.id = id;
      this.name = name;
      this.clientType = clientType;
      this.driverLicense = driverLicense;
      this.contactNumber = contactNumber;
      this.residentRegistrationNumber = residentRegistrationNumber;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.occupation = occupation;
      this.address = address;
      this.addressDetail = addressDetail;
      this.interests = interests;
      this.family = family;
      this.anniversary = anniversary;
      this.bankAccountInfo = bankAccountInfo;
      this.notes = notes;
      this.hospitalRecord = hospitalRecord;
      this.insuranceRecord = insuranceRecord;
      this.autoInsuranceExpiration = autoInsuranceExpiration;
      this.fireInsuranceExpiration = fireInsuranceExpiration;
      this.exemptionReductionEndDate = exemptionReductionEndDate;
      this.honorific = honorific;
    }
  
    static fromJson(client: any): ClientModel {
      return new ClientModel(
        client.id,
        client.name,
        client.clientType,
        client.driverLicense,
        client.contactNumber,
        client.residentRegistrationNumber,
        client.createdAt,
        client.updatedAt,
        client.occupation,
        client.address,
        client.addressDetail,
        client.interests,
        client.family,
        client.anniversary,
        client.bankAccountInfo,
        client.notes,
        client.hospitalRecord,
        client.insuranceRecord,
        client.autoInsuranceExpiration,
        client.fireInsuranceExpiration,
        client.exemptionReductionEndDate,
        client.honorific,
      );
    }
  
    // Model 데이터를 DTO로 변환
    toJson(): any {
      return {
        id: this.id,
        name: this.name,
        clientType: this.clientType,
        driverLicense: this.driverLicense,
        contactNumber: this.contactNumber,
        residentRegistrationNumber: this.residentRegistrationNumber,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        occupation: this.occupation,
        address: this.address,
        addressDetail: this.addressDetail,
        interests: this.interests,
        family: this.family,
        anniversary: this.anniversary,
        bankAccountInfo: this.bankAccountInfo,
        notes: this.notes,
        hospitalRecord: this.hospitalRecord,
        insuranceRecord: this.insuranceRecord,
        autoInsuranceExpiration: this.autoInsuranceExpiration,
        fireInsuranceExpiration: this.fireInsuranceExpiration,
        exemptionReductionEndDate: this.exemptionReductionEndDate,
        honorific: this.honorific,
      };
    }
  
    toString(): string {
      return JSON.stringify(this.toJson());
    }


    toDTO(): ClientDTO {
      return {
        name: this.name,
        clientType: this.clientType as "관리 고객" | "가망 고객",
        driverLicense: this.driverLicense as "운전 유" | "운전 무",
        contactNumber: {
          part1: this.contactNumber?.split("-")[0] || "",
          part2: this.contactNumber?.split("-")[1] || "",
          part3: this.contactNumber?.split("-")[2] || "",
        },
        residentRegistrationNumber: {
          part1: this.residentRegistrationNumber?.split("-")[0] || "",
          part2: this.residentRegistrationNumber?.split("-")[1] || "",
        },
        occupation: this.occupation || "",
        address: this.address || "",
        addressDetail: this.addressDetail || "",
        interests: this.interests
          ? this.interests.split(",").map((interest: string) => interest.trim())
          : [],
        family: this.family ? JSON.parse(this.family) : [],
        anniversary: this.anniversary ? JSON.parse(this.anniversary) : [],
        bankAccountInfo: this.bankAccountInfo ? JSON.parse(this.bankAccountInfo) : [],
        notes: this.notes || "",
        hospitalRecord: this.hospitalRecord || "",
        insuranceRecord: this.insuranceRecord || "",
        autoInsuranceExpiration: this.autoInsuranceExpiration
          ? JSON.parse(this.autoInsuranceExpiration)
          : [],
        fireInsuranceExpiration: this.fireInsuranceExpiration
          ? JSON.parse(this.fireInsuranceExpiration)
          : [],
        exemptionReductionEndDate: this.exemptionReductionEndDate
          ? JSON.parse(this.exemptionReductionEndDate)
          : [],
        honorific: this.honorific || ""
      };
    }

    static fromDTO(dto: Partial<ClientDTO>): ClientModel {
      return new ClientModel(
        undefined,
        dto.name || "",
        dto.clientType || "관리 고객",
        dto.driverLicense || "운전 유",
        `${dto.contactNumber?.part1 || ""}-${dto.contactNumber?.part2 || ""}-${dto.contactNumber?.part3 || ""}`,
        `${dto.residentRegistrationNumber?.part1 || ""}-${dto.residentRegistrationNumber?.part2 || ""}`,
        new Date().toISOString(),
        new Date().toISOString(),
        dto.occupation || "",
        dto.address || "",
        dto.addressDetail || "",
        (dto.interests || []).join(","),
        JSON.stringify(dto.family || []),
        JSON.stringify(dto.anniversary || []),
        JSON.stringify(dto.bankAccountInfo || []),
        dto.notes || "",
        dto.hospitalRecord || "",
        dto.insuranceRecord || "",
        JSON.stringify(dto.autoInsuranceExpiration || []),
        JSON.stringify(dto.fireInsuranceExpiration || []),
        JSON.stringify(dto.exemptionReductionEndDate || []),
        dto.honorific || "",
      );
    }
    
    get birthDate(): Date | null {
      if (!this.residentRegistrationNumber) return null;
      const [part1, part2] = this.residentRegistrationNumber.split("-");
      if (part1 && part2) {
          return getBirthday({ part1, part2 });
      }
      return null;
    }
    
    async getManagementGroups(): Promise<ManagementGroupModel[]> {
      if(this.id){
          const dao = await new ClientManagementGroupDao();
          return dao.getManagementGroupsByClientId(this.id);
      }
      return [];
    }
    
    //그룹 리스트를 , 로 연결한 문자열
    async getManagementGroupsString(): Promise<string> {
      const groups = await this.getManagementGroups();
      return groups.map(group => group.groupName).join(",");
    }

    static async getManagementGroupsFromDTO(dto: Partial<ClientDTO>): Promise<ManagementGroupModel[]> {
      if(dto.id){
        const dao = await new ClientManagementGroupDao();
        return dao.getManagementGroupsByClientId(dto.id);
      }
      return [];
    }
    

    static async getManagementGroupsStringFromDTO(dto: Partial<ClientDTO>): Promise<string> {
      const groups = await ClientModel.getManagementGroupsFromDTO(dto);
      return groups.map(group => group.groupName).join(",");
    }
  }
  