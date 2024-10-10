export type PaymentDTO = {
  id: string;
  tid: string;
  moid: string;
  arsTid: string;
  arsNo: string;
  arsOrderKey: string;
  payExpDate: string;
  billKey: string;
  userId: string;
  acquCardCode: string;
  acquCardName: string;
  amt: string;
  appCardCode: string;
  appCardName: string;
  authCode: string;
  authDate: string;
  buyerEmail: string;
  buyerName: string;
  buyerTel: string;
  cardNum: string;
  cardQuota: string;
  goodsName: string;
  resultCode: string;
  resultMsg: string;
  createdAt: string;
};

class PaymentModel {
  id: string;
  tid: string;
  moid: string;
  arsTid: string;
  arsNo: string;
  arsOrderKey: string;
  payExpDate: Date;
  billKey: string;
  userId: string;
  acquCardCode: string;
  acquCardName: string;
  amt: string;
  appCardCode: string;
  appCardName: string;
  authCode: string;
  authDate: Date;
  buyerEmail: string;
  buyerName: string;
  buyerTel: string;
  cardNum: string;
  cardQuota: string;
  goodsName: string;
  resultCode: string;
  resultMsg: string;
  createdAt: Date;

  // 생성자는 각 필드를 받아 초기화
  constructor(
    id: string,
    tid: string,
    moid: string,
    arsTid: string,
    arsNo: string,
    arsOrderKey: string,
    payExpDate: Date,
    billKey: string,
    userId: string,
    acquCardCode: string,
    acquCardName: string,
    amt: string,
    appCardCode: string,
    appCardName: string,
    authCode: string,
    authDate: Date,
    buyerEmail: string,
    buyerName: string,
    buyerTel: string,
    cardNum: string,
    cardQuota: string,
    goodsName: string,
    resultCode: string,
    resultMsg: string,
    createdAt: Date
  ) {
    this.id = id;
    this.tid = tid;
    this.moid = moid;
    this.arsTid = arsTid;
    this.arsNo = arsNo;
    this.arsOrderKey = arsOrderKey;
    this.payExpDate = payExpDate;
    this.billKey = billKey;
    this.userId = userId;
    this.acquCardCode = acquCardCode;
    this.acquCardName = acquCardName;
    this.amt = amt;
    this.appCardCode = appCardCode;
    this.appCardName = appCardName;
    this.authCode = authCode;
    this.authDate = authDate;
    this.buyerEmail = buyerEmail;
    this.buyerName = buyerName;
    this.buyerTel = buyerTel;
    this.cardNum = cardNum;
    this.cardQuota = cardQuota;
    this.goodsName = goodsName;
    this.resultCode = resultCode;
    this.resultMsg = resultMsg;
    this.createdAt = createdAt;
  }

  // DTO -> Model 변환
  static fromJson(dto: PaymentDTO): PaymentModel {
    return new PaymentModel(
      dto.id,
      dto.tid,
      dto.moid,
      dto.arsTid,
      dto.arsNo,
      dto.arsOrderKey,
      new Date(dto.payExpDate),
      dto.billKey,
      dto.userId,
      dto.acquCardCode,
      dto.acquCardName,
      dto.amt,
      dto.appCardCode,
      dto.appCardName,
      dto.authCode,
      new Date(dto.authDate),
      dto.buyerEmail,
      dto.buyerName,
      dto.buyerTel,
      dto.cardNum,
      dto.cardQuota,
      dto.goodsName,
      dto.resultCode,
      dto.resultMsg,
      new Date(dto.createdAt)
    );
  }

  // Model -> DTO 변환
  toJson(): PaymentDTO {
    return {
      id: this.id,
      tid: this.tid,
      moid: this.moid,
      arsTid: this.arsTid,
      arsNo: this.arsNo,
      arsOrderKey: this.arsOrderKey,
      payExpDate: this.payExpDate.toISOString(),
      billKey: this.billKey,
      userId: this.userId,
      acquCardCode: this.acquCardCode,
      acquCardName: this.acquCardName,
      amt: this.amt,
      appCardCode: this.appCardCode,
      appCardName: this.appCardName,
      authCode: this.authCode,
      authDate: this.authDate.toISOString(),
      buyerEmail: this.buyerEmail,
      buyerName: this.buyerName,
      buyerTel: this.buyerTel,
      cardNum: this.cardNum,
      cardQuota: this.cardQuota,
      goodsName: this.goodsName,
      resultCode: this.resultCode,
      resultMsg: this.resultMsg,
      createdAt: this.createdAt.toISOString(),
    };
  }

  // 기본값을 가진 빈 모델 반환
  static empty(): PaymentModel {
    return new PaymentModel(
      "", // id
      "", // tid
      "", // moid
      "", // arsTid
      "", // arsNo
      "", // arsOrderKey
      new Date(), // payExpDate
      "", // billKey
      "", // userId
      "", // acquCardCode
      "", // acquCardName
      "", // amt
      "", // appCardCode
      "", // appCardName
      "", // authCode
      new Date(), // authDate
      "", // buyerEmail
      "", // buyerName
      "", // buyerTel
      "", // cardNum
      "", // cardQuota
      "", // goodsName
      "", // resultCode
      "", // resultMsg
      new Date() // createdAt
    );
  }
}

export default PaymentModel;
