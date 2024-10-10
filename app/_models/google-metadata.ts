export type GoogleMetadataDTO = {
  googleEmail: string;
  name: string;
  picture: string;
  isDriveLinked: string;
  isGmailLinked: string;
  isCalendarLinked: string;
  isContactsLinked: string;
};

class GoogleMetadataModel {
  googleEmail: string;
  name: string;
  picture: string;
  isDriveLinked: string;
  isGmailLinked: string;
  isCalendarLinked: string;
  isContactsLinked: string;

  // 생성자는 각 필드를 받아 초기화
  constructor(
    googleEmail: string,
    name: string,
    picture: string,
    isDriveLinked: string,
    isGmailLinked: string,
    isCalendarLinked: string,
    isContactsLinked: string
  ) {
    this.googleEmail = googleEmail;
    this.name = name;
    this.picture = picture;
    this.isDriveLinked = isDriveLinked;
    this.isGmailLinked = isGmailLinked;
    this.isCalendarLinked = isCalendarLinked;
    this.isContactsLinked = isContactsLinked;
  }

  // DTO -> Model 변환
  static fromJson(dto: GoogleMetadataDTO): GoogleMetadataModel {
    return new GoogleMetadataModel(
      dto.googleEmail,
      dto.name,
      dto.picture,
      dto.isDriveLinked,
      dto.isGmailLinked,
      dto.isCalendarLinked,
      dto.isContactsLinked
    );
  }

  // Model -> DTO 변환
  toJson(): GoogleMetadataDTO {
    return {
      googleEmail: this.googleEmail,
      name: this.name,
      picture: this.picture,
      isDriveLinked: this.isDriveLinked,
      isGmailLinked: this.isGmailLinked,
      isCalendarLinked: this.isCalendarLinked,
      isContactsLinked: this.isContactsLinked,
    };
  }

  // 기본값을 가진 빈 모델 반환
  static empty(): GoogleMetadataModel {
    return new GoogleMetadataModel(
      "", // googleEmail
      "", // name
      "", // picture
      "false", // isDriveLinked
      "false", // isGmailLinked
      "false", // isCalendarLinked
      "false" // isContactsLinked
    );
  }
}

export default GoogleMetadataModel;
