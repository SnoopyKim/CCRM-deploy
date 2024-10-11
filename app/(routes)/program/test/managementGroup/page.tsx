"use client"; // 이 선언을 추가하여 클라이언트 전용임을 명시합니다

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ManagementGroupDao } from "@utils/database/dao/managementGroupDao";
import { ClientDao } from "@utils/database/dao/clientDao";

import { downloadDatabase } from "@utils/database/getDatabase";
import { loadDatabaseFromFile } from "@utils/database/getDatabase";

const ManagementGroupPage: React.FC = () => {
  const [groups, setGroups] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [groupName, setGroupName] = useState<string>("");
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const router = useRouter();

  const clientDao = new ClientDao();
  const managementGroupDao = new ManagementGroupDao();

  useEffect(() => {
    const setupDatabase = async () => {
      // ManagementGroup 데이터 조회
      const fetchedGroups = await managementGroupDao.getAllManagementGroups();
      setGroups(fetchedGroups);

      // Client 데이터 조회
      const fetchedClients = await clientDao.getAllClients();
      setClients(fetchedClients);
    };

    setupDatabase().catch(console.error);
  }, []);

  const handleAddGroup = async () => {
    if (groupName) {
      const managementGroupDao = new ManagementGroupDao();
      await managementGroupDao.insertManagementGroup({
        group_name: groupName,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      const fetchedGroups = await managementGroupDao.getAllManagementGroups();
      setGroups(fetchedGroups);

      setGroupName("");
    }
  };

  const handleAssignClientToGroup = async () => {
    if (selectedClientId && selectedGroupId) {
      const clientDao = new ClientDao();
      await clientDao.updateClient(selectedClientId, {
        management_group_id: selectedGroupId,
      });

      const fetchedClients = await clientDao.getAllClients();
      setClients(fetchedClients);

      setSelectedClientId(null);
      setSelectedGroupId(null);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]); // 선택한 파일 저장
    }
  };

  const handleUpload = async () => {
    if (file) {
      try {
        await loadDatabaseFromFile(file); // 파일을 DB로 로드
        alert("Database loaded successfully from file.");

        // ManagementGroup 데이터 조회
        const fetchedGroups = await managementGroupDao.getAllManagementGroups();
        setGroups(fetchedGroups);

        // Client 데이터 조회
        const fetchedClients = await clientDao.getAllClients();
        setClients(fetchedClients);
      } catch (error) {
        console.error("Error loading database:", error);
        alert("Failed to load database.");
      }
    }
  };

  const handleNavigateToClient = () => {
    router.push("/program/test/client"); // /program/test/client로 이동
  };

  const handleNavigateToConsultation = () => {
    router.push("/program/test/consultation"); // /program/test/consultation으로 이동
  };

  const handleNavigateToManagementGroup = () => {
    router.push("/program/test/managementGroup"); // /program/test/managementGroup으로 이동
  };

  const handleNavigateToMemo = () => {
    router.push("/program/test/memo"); // /program/test/memo으로 이동
  };

  return (
    <div>
      <h1>Management Group Management</h1>

      <div>
        <button onClick={handleNavigateToClient}>Client</button>
        <span style={{ margin: "0 10px" }} />
        <button onClick={handleNavigateToConsultation}>Consultation</button>
        <span style={{ margin: "0 10px" }} />
        <button onClick={handleNavigateToManagementGroup}>Management</button>
        <span style={{ margin: "0 10px" }} />
        <button onClick={downloadDatabase}>Download Database</button>
        <span style={{ margin: "0 10px" }} />

        <input type="file" accept=".sqlite" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={!file}>
          Upload Database
        </button>
      </div>

      {/* 그룹 추가 섹션 */}
      <div>
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <button onClick={handleAddGroup}>Add Group</button>
      </div>

      {/* 클라이언트를 그룹에 할당하는 섹션 */}
      <div>
        <h2>Assign Client to Group</h2>
        <select
          value={selectedClientId ?? ""}
          onChange={(e) => setSelectedClientId(Number(e.target.value))}
        >
          <option value="">Select Client</option>
          {clients.map((client, index) => (
            <option key={index} value={client[0]}>
              {client[1]} (ID: {client[0]})
            </option>
          ))}
        </select>

        <select
          value={selectedGroupId ?? ""}
          onChange={(e) => setSelectedGroupId(Number(e.target.value))}
        >
          <option value="">Select Group</option>
          {groups.map((group, index) => (
            <option key={index} value={group[0]}>
              {group[1]} (ID: {group[0]})
            </option>
          ))}
        </select>

        <button onClick={handleAssignClientToGroup}>Assign to Group</button>
      </div>

      {/* 그룹 목록 */}
      <h2>Groups</h2>
      <ul>
        {groups.map((group, index) => (
          <li key={index}>{`${group[1]} (ID: ${group[0]})`}</li>
        ))}
      </ul>
    </div>
  );
};

export default ManagementGroupPage;
