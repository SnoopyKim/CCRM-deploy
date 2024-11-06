"use client";

import Link from "next/link";
import ClientModel, { getHalfBirthday } from "@/app/_models/client";

export default function CustomerTable({
  clients,
  setClients,
}: {
  clients: ClientModel[];
  setClients: React.Dispatch<React.SetStateAction<ClientModel[]>>;
}) {
  return (
    <>
      <table className="w-full mt-4">
        <colgroup>
          <col width="60px" />
          <col width="*" />
          <col width="140px" />
          <col width="140px" />
          <col width="140px" />
          <col width="140px" />
          <col width="*" />
          <col width="*" />
        </colgroup>

        <thead>
          <tr className="bg-grayscale-13 border-y border-grayscale-11">
            <th className=""></th>
            <th className="py-2 text-left font-normal">고객명</th>
            <th className="text-left font-normal">구분</th>
            <th className="text-left font-normal">연락처</th>
            <th className="text-left font-normal">상령일</th>
            <th className="text-left font-normal">생년월일</th>
            <th className="text-left font-normal">그룹관리</th>
            <th className="text-left font-normal">정보</th>
          </tr>
        </thead>
        <tbody>
          {(clients || []).map((client: ClientModel) => (
            <tr key={client.id} className="border-b border-grayscale-11">
              <td className="py-4">
                <div className="flex justify-center">
                  <input
                    type="checkbox"
                    name="p_check"
                    id={`p_check${client.id}`}
                    checked={client.isDeleteChecked || false}
                    onChange={(e) =>
                      setClients((prevClients) =>
                        prevClients.map((c) =>
                          c.id === client.id
                            ? Object.assign(
                                Object.create(Object.getPrototypeOf(c)),
                                c,
                                { isDeleteChecked: e.target.checked }
                              )
                            : c
                        )
                      )
                    }
                  />
                </div>
              </td>
              <td className="font-semibold">{client.name}</td>
              <td className="text-sub-3">{client.clientType}</td>
              <td>{client.contactNumber}</td>
              <td>
                {getHalfBirthday(
                  client.toDTO().residentRegistrationNumber
                )?.toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
              <td>
                {client.birthDate
                  ? client.birthDate.toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "-"}
              </td>
              <td className="text-sub-2 truncate">{client.groupString}</td>
              <td>
                <Link
                  href={`/program/customer/edit?id=${client.id}`}
                  className="underline underline-offset-2"
                >
                  자세히
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
