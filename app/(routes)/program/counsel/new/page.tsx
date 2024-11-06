"use client";

import { Select, SelectField } from "@/app/_components/Select";
import {
  Input,
  SearchField,
  TextArea,
  TextField,
} from "@/app/_components/Text";
import TextLabel from "@/app/_components/Text/label";
import ColorButton from "../../customer/_components/color-button";
import PrimaryButton from "@/app/_components/Button/button";
import { useRouter } from "next/navigation";
import useDialogStore from "@/app/_utils/dialog/store";
import { Address, useDaumPostcodePopup } from "react-daum-postcode";
import { useState } from "react";
import { ConsultationDao } from "@/app/_utils/database/dao/consultationDao";
import ConsultationModel, {
  consultationContents,
  ConsultationDTO,
} from "@/app/_models/consultation";
import ClientModel from "@/app/_models/client";
import CustomerSelectionDialog from "@/app/_components/Dialog/customer/selection";

export default function CounselPage() {
  const router = useRouter();
  const openPostcodePopup = useDaumPostcodePopup();
  const openAlert = useDialogStore((state) => state.openAlert);
  const openCustom = useDialogStore((state) => state.openCustom);

  // const isExecuted = useRef(false);

  const [formData, setFormData] = useState<Partial<ConsultationDTO>>({
    content: 0,
    consultationTimeDetail: {
      timePeriod: "am",
      hour: 1,
      minute: 0,
    },
    consultationStatus: "SCHEDULED",
  });
  // const [clients, setClients] = useState<ClientModel[]>([]);
  // const [searchTerm, setSearchTerm] = useState("");

  // const clientDao = new ClientDao();
  const consultationDao = new ConsultationDao();

  // useEffect(() => {
  //   if (!isExecuted.current) {
  //     isExecuted.current = true;
  //     setupDatabase().catch(console.error);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [searchTerm]);

  // const setupDatabase = async () => {
  //   const fetchedClients = await clientDao.getAllClients();
  //   setClients(fetchedClients);
  // };

  const addCounsel = async () => {
    //유효성검사
    if (!formData.title || formData.title.trim() === "") {
      await openAlert({
        title: "상담 제목 없음",
        description: "상담 제목을 입력해주세요",
      });
      return;
    } else if (!formData.clientId) {
      await openAlert({
        title: "고객 정보 없음",
        description: "고객 정보를 입력해주세요",
      });
      return;
    } else if (
      !formData.consultationTime ||
      formData.consultationTime.trim() === ""
    ) {
      await openAlert({
        title: "상담 일자 없음",
        description: "상담 일자를 입력해주세요",
      });
      return;
    }

    await consultationDao.insertConsultation(
      ConsultationModel.fromDTO(formData)
    );

    await openAlert({
      title: "상담 등록 완료",
      description: "상담 현황 페이지로 이동합니다",
    });
    router.push("/program/counsel/list");
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const selectCustomer = async () => {
    const selectedCustomer = await openCustom<ClientModel>(
      <CustomerSelectionDialog />
    );
    if (!selectedCustomer) return;

    setFormData((prev) => ({
      ...prev,
      clientId: selectedCustomer.id,
      client: {
        name: selectedCustomer.name,
        contactNumber: {
          part1: selectedCustomer.contactNumber?.split("-")[0] || "",
          part2: selectedCustomer.contactNumber?.split("-")[1] || "",
          part3: selectedCustomer.contactNumber?.split("-")[2] || "",
        },
      },
    }));
  };

  // const onClientSearch = (name: string) => {
  //   const filteredClients = clients.filter(
  //     (client) => client.name.includes(name) // 고객명
  //   );
  //   if (filteredClients.length > 0) {
  //     const client = filteredClients[0]; // 서칭된 첫 값으로 고정(추후 수정 필요)
  //     //고객명을 받을때 입력
  //     if (client) {
  //       formData.clientId = client.id;
  //       formData.client = {
  //         name: client.name,
  //         contactNumber: {
  //           part1: client.contactNumber?.split("-")[0] || "",
  //           part2: client.contactNumber?.split("-")[1] || "",
  //           part3: client.contactNumber?.split("-")[2] || "",
  //         },
  //       };
  //       setSearchTerm(client.name);
  //       handleChange("client", { ...formData.client, name: client.name });
  //     }
  //   }
  // };

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
    handleChange("consultationAddress", fullAddress);
  };

  return (
    <div className="w-full p-6 space-y-8">
      <h1 className="text-3xl text-normal">상담 등록</h1>
      <div className="flex gap-4">
        <div className="flex flex-col gap-4 w-1/2">
          <h2 className="text-2xl font-normal">고객정보 / 상담내용</h2>
          <div className="flex flex-col gap-4 px-6 py-4 bg-grayscale-13">
            <div>
              <TextLabel title="상담 제목" />
              <Input
                type="text"
                placeholder="상담 제목"
                required
                className="mt-2"
                value={formData.title || ""}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>
            <div>
              <TextLabel title="고객명" className="mb-2" />
              <SearchField
                placeholder="클릭 후 고객을 선택하세요"
                onSearch={() => {}}
                onClick={selectCustomer}
                className="caret-transparent"
                value={formData.client?.name || ""}
              />
            </div>
            <div>
              <TextLabel title="연락처" />
              <div className="flex gap-2 justify-between items-center mt-2">
                <div>
                  <Input
                    type="text"
                    inputMode="numeric"
                    name="mb_phone1"
                    placeholder="010"
                    maxLength={4}
                    className="w-44 disabled:text-main-1"
                    value={formData.client?.contactNumber?.part1 || ""}
                    disabled
                    required
                  />
                </div>
                <span>-</span>
                <div>
                  <Input
                    type="text"
                    inputMode="numeric"
                    name="mb_phone2"
                    placeholder=""
                    maxLength={4}
                    className="w-44 disabled:text-main-1"
                    value={formData.client?.contactNumber?.part2 || ""}
                    required
                    disabled
                  />
                </div>
                <span>-</span>
                <div>
                  <Input
                    type="text"
                    inputMode="numeric"
                    name="mb_phone3"
                    placeholder=""
                    maxLength={4}
                    className="w-44 disabled:text-main-1"
                    value={formData.client?.contactNumber?.part3 || ""}
                    disabled
                    required
                  />
                </div>
              </div>
            </div>
            <SelectField
              title="상담 내용"
              placeholder="선택해주세요"
              options={consultationContents}
              value={formData.content || 0}
              onChange={(e) => handleChange("content", e.target.value)}
            />
            <TextArea
              label="자세한 상담내용"
              placeholder="자세한 상담내용 입력"
              className="h-32"
              value={formData.detailedContent || ""}
              onChange={(e) => handleChange("detailedContent", e.target.value)}
            />
            {/* <div className="flex gap-4">
              <ColorButton
                color="sub-2"
                icon="aiVerbal"
                title="대화 음성녹음"
              />
              <ColorButton color="sub-2" icon="aiFile" title="텍스트 변환" />
              <ColorButton color="sub-2" icon="ai" title="AI 요약" />
            </div> */}
          </div>
        </div>
        <div className="flex flex-col gap-4 w-1/2">
          <h2 className="text-2xl font-normal">상세 상담 정보</h2>
          <div className="flex flex-col gap-4 px-6 py-4 bg-grayscale-13">
            <div>
              <TextField
                title="상담 일"
                type="date"
                value={formData.consultationTime || ""}
                onChange={(e) =>
                  handleChange("consultationTime", e.target.value)
                }
              />
            </div>
            <div>
              <TextLabel title="상담 시간" />
              <div className="flex gap-2 mt-2">
                <div className="flex-1">
                  <Select
                    options={[
                      { value: "am", text: "오전" },
                      { value: "pm", text: "오후" },
                    ]}
                    className="h-12 py-2"
                    value={formData.consultationTimeDetail?.timePeriod || "am"}
                    onChange={(e) =>
                      handleChange("consultationTimeDetail", {
                        ...formData.consultationTimeDetail,
                        timePeriod: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex-1">
                  <Select
                    options={Array.from({ length: 12 }, (_, i) => ({
                      value: i + 1,
                      text: `${i + 1}시`,
                    }))}
                    className="h-12 py-2"
                    value={formData.consultationTimeDetail?.hour || 1}
                    onChange={(e) =>
                      handleChange("consultationTimeDetail", {
                        ...formData.consultationTimeDetail,
                        hour: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex-1">
                  <Select
                    options={Array.from({ length: 60 }, (_, i) => ({
                      value: i,
                      text: `${i}분`,
                    }))}
                    className="h-12 py-2"
                    value={formData.consultationTimeDetail?.minute || 0}
                    onChange={(e) =>
                      handleChange("consultationTimeDetail", {
                        ...formData.consultationTimeDetail,
                        minute: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div>
              <TextField
                title="상담 장소"
                name="mb_addr1"
                placeholder="주소 검색"
                value={formData.consultationAddress || ""}
                readOnly
                onClick={() =>
                  openPostcodePopup({ onComplete: handlePostcodeComplete })
                }
              />
              <Input
                type="text"
                name="mb_addr2"
                placeholder="나머지 주소 입력"
                required
                className="mt-2"
                value={formData.consultationAddressDetail || ""}
                onChange={(e) =>
                  handleChange("consultationAddressDetail", e.target.value)
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <PrimaryButton
          color="gray"
          title="뒤로"
          className="w-40"
          onClick={() => router.back()}
        />
        <PrimaryButton
          color="secondary"
          title="저장"
          className="w-40"
          onClick={addCounsel}
        />
      </div>
    </div>
  );
}
