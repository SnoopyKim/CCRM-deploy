"use client";

import SmsGroupDialog from "@/app/_components/Dialog/sms/group";
import Dropdown from "@/app/_components/Dropdown";
import Icon from "@/app/_components/Icon";
import cn from "@/app/_utils/cn";
import useDialogStore from "@/app/_utils/dialog/store";
import Link from "next/link";
import { useState } from "react";

export default function SmsGroupSidebar() {
  const openCustom = useDialogStore((state) => state.openCustom);
  return (
    <nav className="w-60 flex flex-col">
      <h3 className="text-grayscale-5 font-normal">그룹 관리</h3>
      <ul className="mt-4 p-2 text font-medium border-t border-grayscale-11">
        {[
          "채팅 그룹 이름 1",
          "서초구 모임",
          "아차산 병원",
          "교회-상담 모임",
          "불교 모임",
          "헬스 클럽 회원님들",
        ].map((item, i) => (
          <li key={i}>
            <Dropdown
              options={[
                {
                  icon: "create",
                  label: "채팅그룹 수정",
                  onClick: () =>
                    openCustom(<SmsGroupDialog groupName={item} />),
                },
                { icon: "delete", label: "채팅그룹 제거" },
              ]}
            >
              <div
                className={cn(
                  "w-full p-3 rounded hover:bg-grayscale-12 truncate"
                )}
              >
                {item}
              </div>
            </Dropdown>
          </li>
        ))}
      </ul>
    </nav>
  );
}
