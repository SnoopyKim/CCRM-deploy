"use client"; // 이 선언을 파일 맨 위에 넣어주세요

import React, { useEffect, useState, useRef } from "react";
import { ClientDao } from "@utils/database/dao/clientDao";
import { useRouter } from "next/navigation"; // Next.js의 최신 라우터 가져오기 (useRouter가 아니라 useNavigation)

import { downloadDatabase } from "@utils/database/getDatabase";
import { loadDatabaseFromFile } from "@utils/database/getDatabase";

const App: React.FC = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [name, setName] = useState<string>("");
  const [clientType, setClientType] = useState<string>("");
  const isExecuted = useRef(false); // useRef로 중복 실행 방지
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);

  const clientDao = new ClientDao();

  useEffect(() => {
    const setupDatabase = async () => {
      if (!isExecuted.current) {
        isExecuted.current = true;

        // Client 데이터 조회
        const fetchedClients = await clientDao.getAllClients();
        setClients(fetchedClients);
      }
    };

    setupDatabase().catch(console.error);
  }, []);

  const handleAddClient = async () => {
    if (name && clientType) {
      const clientDao = new ClientDao();
      await clientDao.insertClient({
        name,
        client_type: clientType,
        contact_number: "000-000-0000",
        resident_registration_number: "000000-0000000",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      const fetchedClients = await clientDao.getAllClients();
      setClients(fetchedClients);

      // 입력 필드 초기화
      setName("");
      setClientType("");
    }
  };

  const handleDeleteClient = async (id: number) => {
    const clientDao = new ClientDao();
    await clientDao.deleteClient(id);

    const fetchedClients = await clientDao.getAllClients();
    setClients(fetchedClients);
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
      <h1>Client Management</h1>

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

      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Client Type"
          value={clientType}
          onChange={(e) => setClientType(e.target.value)}
        />
        <button onClick={handleAddClient}>Add Client</button>
      </div>

      <h2>Clients</h2>
      <ul>
        {clients.map((client, index) => (
          <li key={index}>
            {`${client[1]} (Type: ${client[2]})`}
            <button onClick={() => handleDeleteClient(client[0])}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
