"use client";

import ColorButton from "@/app/(routes)/program/customer/_components/color-button";
import PrimaryButton from "@/app/_components/Button/button";
import Icon from "@/app/_components/Icon";
import { Select, SelectField } from "@/app/_components/Select";
import { Input, TextArea, TextField } from "@/app/_components/Text";
import TextLabel from "@/app/_components/Text/label";
import ConsultationModel, {
  consultationContents,
  ConsultationDTO,
} from "@/app/_models/consultation";
import { ClientDao } from "@/app/_utils/database/dao/clientDao";
import { ConsultationDao } from "@/app/_utils/database/dao/consultationDao";
import useDialogStore from "@/app/_utils/dialog/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Address, useDaumPostcodePopup } from "react-daum-postcode";

export default function CounselEditPage({
  params,
}: {
  params: {
    id: number;
  };
}) {
  const router = useRouter();
  const openPostcodePopup = useDaumPostcodePopup();
  const openAlert = useDialogStore((state) => state.openAlert);

  const [formData, setFormData] = useState<Partial<ConsultationDTO> | null>(
    null
  );

  const [consultations, setConsultations] = useState<ConsultationModel[]>([]);

  const clientDao = new ClientDao();
  const consultationDao = new ConsultationDao();

  useEffect(() => {
    if (!formData) {
      //데이터가 이상하면 404
      if (!params?.id || isNaN(params.id)) {
        router.push("/program/404");
        return;
      }

      const fetchData = async () => {
        try {
          const consultationData: ConsultationModel | null =
            await consultationDao.getConsultation(params.id);

          if (!consultationData) {
            router.push("/program/404");
          } else {
            const clientData = await clientDao.getClient(
              consultationData.clientId
            );
            if (!clientData) router.push("/program/404");
            setFormData({
              ...consultationData.toDTO(),
              client: {
                name: clientData?.name,
                contactNumber: {
                  part1: clientData?.contactNumber?.split("-")[0] || "",
                  part2: clientData?.contactNumber?.split("-")[1] || "",
                  part3: clientData?.contactNumber?.split("-")[2] || "",
                },
              },
            });
            const consultations =
              await consultationDao.getConsultationsByClientId(
                consultationData.clientId
              );
            setConsultations(consultations);
          }
        } catch (error) {
          console.error(error);
          router.push("/program/404");
        }
      };

      fetchData();
    }
  }, [router, formData, params.id]);

  const addCounsel = async () => {
    //유효성검사
    if (!formData?.title || formData.title.trim() === "") {
      await openAlert({
        title: "상담 제목 없음",
        description: "상담 제목을 입력해주세요",
      });
      return;
    } else if (
      !formData?.consultationTime ||
      formData.consultationTime.trim() === ""
    ) {
      await openAlert({
        title: "상담 일자 없음",
        description: "상담 일자를 입력해주세요",
      });
      return;
    }

    if (formData.id) {
      await consultationDao.updateConsultation(
        formData.id,
        ConsultationModel.fromDTO(formData)
      );

      await openAlert({
        title: "상담 수정 완료",
        description: "상담 현황 페이지로 이동합니다",
      });
    }
    router.push("/program/counsel/list");
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
    handleChange("consultationAddress", fullAddress);
  };

  const handleEditConsultation = (consultationId: number) => {
    const consultation = consultations.find((c) => c.id === consultationId);
    if (consultation) {
      // URL 변경
      const newUrl = `/program/counsel/edit/${consultationId}`;
      window.history.pushState(null, "", newUrl);

      setFormData({
        ...consultation.toDTO(),
        client: formData?.client,
      });
    }
  };

  return (
    <div className="flex flex-col max-w-screen-lg w-full p-6 space-y-8 mx-auto">
      <h1 className="text-3xl text-normal">상세보기 및 수정</h1>
      <div className="flex max-lg:flex-col gap-4 flex-grow">
        <div className="flex flex-col gap-4 lg:w-1/3 ">
          <h2 className="text-xl font-normal">이전 상담 내용</h2>
          <div className="flex-1 border border-grayscale-11 px-6 py-4 space-y-4">
            {consultations.map((consultation) => (
              <div key={consultation.id} className="flex gap-2 items-center">
                <div className="flex gap-2 rounded-full px-2 py-1 bg-grayscale-12 items-center">
                  <span className="bg-sub-1 rounded-full w-4 h-4"></span>
                  <span className="text-sub-1 font-normal">
                    {consultationContents.find(
                      (item) => item.value === consultation.content
                    )?.text || ""}
                  </span>
                </div>
                <span className="text-grayscale-6">-</span>
                <span className="text-grayscale-6">
                  {consultation.consultationTime}
                </span>
                <button
                  onClick={() => handleEditConsultation(consultation?.id || 0)}
                  className="p-1 rounded hover:bg-grayscale-12"
                >
                  <Icon
                    type={"create"}
                    className="w-5 h-5 fill-sub-2"
                    onClick={() =>
                      handleEditConsultation(consultation?.id || 0)
                    }
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:w-2/3">
          <h2 className="text-xl font-normal">고객정보 / 상담내용</h2>
          <div className="flex flex-col flex-1 px-6 py-4 gap-4 bg-grayscale-13">
            <div>
              <TextLabel title="상담 제목" />
              <div className="flex gap-4 mt-2 items-center">
                <Input
                  placeholder="상담 제목을 입력하세요"
                  required
                  value={formData?.title || ""}
                  onChange={(e) => handleChange("title", e.target.value)}
                />
                <Select
                  id="isFinished"
                  value={formData?.consultationStatus || "SCHEDULED"}
                  options={[
                    { text: "상담 예정", value: "SCHEDULED" },
                    { text: "상담 완료", value: "COMPLETED" },
                  ]}
                  onChange={(e) =>
                    handleChange("consultationStatus", e.target.value)
                  }
                  className="w-32"
                />
              </div>
            </div>
            <div>
              <TextLabel title="고객명" />
              <p className="mt-2 text-xl font-semibold">
                {formData?.client?.name || ""}
              </p>
            </div>
            <div>
              <TextLabel title="연락처" />
              <p className="mt-2 text-lg font-normal">
                {formData?.client?.contactNumber
                  ? `${formData?.client?.contactNumber.part1}-${formData?.client?.contactNumber.part2}-${formData?.client?.contactNumber.part3}`
                  : "-"}
              </p>
            </div>
            <SelectField
              title="상담 내용"
              placeholder="선택해주세요"
              options={consultationContents}
              value={formData?.content || 0}
              onChange={(e) => handleChange("content", e.target.value)}
            />
            <TextArea
              label="자세한 상담내용"
              placeholder="자세한 상담내용 입력"
              className="h-32"
              value={formData?.detailedContent || ""}
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
            <TextField
              title="상담 일"
              type="date"
              value={formData?.consultationTime || ""}
              onChange={(e) => handleChange("consultationTime", e.target.value)}
            />
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
                    value={formData?.consultationTimeDetail?.timePeriod || "am"}
                    onChange={(e) =>
                      handleChange("consultationTimeDetail", {
                        ...formData?.consultationTimeDetail,
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
                    value={formData?.consultationTimeDetail?.hour || 1}
                    onChange={(e) =>
                      handleChange("consultationTimeDetail", {
                        ...formData?.consultationTimeDetail,
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
                    value={formData?.consultationTimeDetail?.minute || 0}
                    onChange={(e) =>
                      handleChange("consultationTimeDetail", {
                        ...formData?.consultationTimeDetail,
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
                value={formData?.consultationAddress || ""}
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
                value={formData?.consultationAddressDetail || ""}
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
