"use client";

import { useState,useEffect } from "react";
import CheckBox from "@/app/_components/CheckBox/default";
import SelectField from "@/app/_components/Select/select-field";
import TextField from "@/app/_components/Text/field";
import Input from "@/app/_components/Text/input";

import { Address, useDaumPostcodePopup } from "react-daum-postcode";
import {occupations,interests, ClientDTO, getHalfBirthday, getInsuranceAge} from "@/app/_models/client";

export default function InfoForm({
  onSubmit,
  formData, 
  setFormData,
}: {
  onSubmit: ((formData: any) => void)|null;
  formData: Partial<ClientDTO>|null 
  setFormData: React.Dispatch<React.SetStateAction<Partial<ClientDTO> | null>>;
}) {

  const openPostcodePopup = useDaumPostcodePopup();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData); 
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePostcodeComplete = (data: Address) => {
    let fullAddress = data.address; // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    handleChange("address",fullAddress);
  };

  return (
    <form
      className="flex flex-col gap-4 bg-grayscale-13 p-6"
      onSubmit={handleSubmit}
    >
      <div className="text-xl font-normal">
        고객 정보 <span className="text-sub-1">(필수기재)</span>
      </div>
      
      <TextField
        title="이름"
        required
        value={formData?.name||""}
        onChange={(e) => handleChange("name", e.target.value)}
      />

      <div className="grid grid-cols-2">
        <div className="">
          <strong>고객 구분(필수)</strong>
          <div className="flex gap-2">
            <input
              type="radio"
              name="clientType"
              value="관리 고객"
              checked={formData?.clientType === "관리 고객"||true}
              onChange={() => handleChange("clientType", "관리 고객")}
            />
            <label>관리고객</label>
          </div>
          <div className="flex gap-2">
            <input
              type="radio"
              name="clientType"
              value="가망 고객"
              checked={formData?.clientType === "가망 고객"||false}
              onChange={() => handleChange("clientType", "가망 고객")}
            />
            <label>가망고객</label>
          </div>
        </div>
        <div className="">
          <strong>운전 면허(필수)</strong>
          <div className="flex gap-2">
            <input
              type="radio"
              name="driverLicense"
              value="운전 유"
              checked={formData?.driverLicense === "운전 유"||true}
              onChange={() => handleChange("driverLicense", "운전 유")}
            />
            <label>운전 유</label>
          </div>
          <div className="flex gap-2">
            <input
              type="radio"
              name="driverLicense"
              value="운전 무"
              checked={formData?.driverLicense === "운전 무"||false}
              onChange={() => handleChange("driverLicense", "운전 무")}
            />
            <label>운전 무</label>
          </div>
        </div>
      </div>

      <SelectField
        title="하시는 일"
        placeholder="선택"
        options={occupations}
        className="w-full"
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          const selectedValue = event.target.value; 
          handleChange("occupation", selectedValue);
          console.log(selectedValue); 
        }}
      />

      <div className="flex flex-col">
        <span className="text-sm font-semibold text-grayscale-6">
          핸드폰 연락처
        </span>
        <div className="flex gap-4 justify-between items-center mt-2">
          <Input
            type="text"
            inputMode="numeric"
            placeholder="010"
            maxLength={4}
            className="w-44"
            value={formData?.contactNumber?.part1||""}
            onChange={(e) => handleChange("contactNumber", { ...formData?.contactNumber, part1: e.target.value })}
            required
          />
          <span>-</span>
          <Input
            type="text"
            inputMode="numeric"
            maxLength={4}
            className="w-44"
            value={formData?.contactNumber?.part2||""}
            onChange={(e) => handleChange("contactNumber", { ...formData?.contactNumber, part2: e.target.value })}
            required
          />
          <span>-</span>
          <Input
            type="text"
            inputMode="numeric"
            maxLength={4}
            className="w-44"
            value={formData?.contactNumber?.part3||""}
            onChange={(e) => handleChange("contactNumber", { ...formData?.contactNumber, part3: e.target.value })}
            required
          />
        </div>
      </div>
    
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-grayscale-6">주민번호</span>
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mt-2">
            <Input
              type="text"
              inputMode="numeric"
              name="mb_resident_num"
              placeholder="주민번호 앞 6자리"
              value={formData?.residentRegistrationNumber?.part1||""}
              onChange={(e) => handleChange("residentRegistrationNumber", { ...formData?.residentRegistrationNumber, part1: e.target.value })}
              maxLength={6}
              required
            />
            <span>-</span>
            <div className="flex flex-1">
              <div className="flex flex-shrink items-center">
                <Input
                  type="text"
                  inputMode="numeric"
                  name="mb_resident_num2"
                  placeholder=""
                  value={formData?.residentRegistrationNumber?.part2||""}
                  onChange={(e) => handleChange("residentRegistrationNumber", { ...formData?.residentRegistrationNumber, part2: e.target.value })}
                  maxLength={1}
                  className="w-12 mr-2"
                  required
                />
                <span>******</span>
              </div>
            </div>
          </div>
          <ul className="flex flex-col">
            <li className="list-inside list-disc ml-2">
              보험 나이 <span className="text-sub-1">{getInsuranceAge(formData?.residentRegistrationNumber) || "-"}세</span>
              &nbsp;&nbsp;|&nbsp;&nbsp;상령일&nbsp;
              <span className="text-sub-1">
                매년 {getHalfBirthday(formData?.residentRegistrationNumber)?.toLocaleDateString("ko-KR", { month: "long", day: "numeric" }) || "-"}
              </span>
            </li>
            <li className="list-inside list-disc ml-2">
              상령일은 일정관리에 노출됩니다.
            </li>
          </ul>
        </div>
      </div>

      <div>
        <TextField
          title="자택 주소"
          name="address1"
          placeholder="주소 검색"
          readOnly
          value={formData?.address||""}
          onClick={() =>
            openPostcodePopup({ onComplete: handlePostcodeComplete })
          }
        />
        <Input
          type="text"
          name="address2"
          placeholder="나머지 주소 입력"
          required
          className="mt-2"
          value={formData?.addressDetail||""}
          onChange={(e) => handleChange("addressDetail", e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <span className="text-sm font-semibold text-grayscale-6">관심 사항 / 성향 (최대 3개)</span>
        <div className="grid grid-cols-3 mt-2">
          {interests.map((item) => (
            <CheckBox
              key={item.value}
              name={item.value}
              label={item.text}
              checked={formData?.interests?.includes(item.value) || false}
              onChecked={(checked: boolean) => {
                const currentInterests = formData?.interests || []
                if (checked) {
                  // 체크박스가 체크되었을 때
                  if (currentInterests.length < 3) {
                    handleChange("interests", [...currentInterests, item.value]);
                  } else {
                    alert("최대 3개까지 선택 가능합니다.");
                    setTimeout(() => {
                      handleChange("interests", currentInterests);
                    }, 0);
                  }
                } else {
                  // 체크박스가 체크 해제되었을 때
                  handleChange(
                    "interests",
                    currentInterests.filter((interest) => interest !== item.value)
                  );
                }
              }}
            />
          ))}
        </div>
      </div>

      {onSubmit && (
        <button
          type="submit"
          className="bg-main-2 text-grayscale-14 py-4 hover:bg-main-3 font-normal"
        >
          고객 등록 완료
        </button>
      )}
    </form>
  );
}
