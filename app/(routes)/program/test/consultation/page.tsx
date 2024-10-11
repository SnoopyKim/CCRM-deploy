"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ConsultationDao } from "@utils/database/dao/consultationDao";
import { ClientDao } from "@utils/database/dao/clientDao";

import { downloadDatabase } from "@utils/database/getDatabase";
import { loadDatabaseFromFile } from "@utils/database/getDatabase";

const ConsultationPage: React.FC = () => {
  const [consultations, setConsultations] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [title, setTitle] = useState<string>("");
  const [consultationTime, setConsultationTime] = useState<string>("");
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const isExecuted = useRef(false); // useRef로 중복 실행 방지

  const router = useRouter();

  const consultationDao = new ConsultationDao();
  const clientDao = new ClientDao();

  useEffect(() => {
    const setupDatabase = async () => {
      if (!isExecuted.current) {
        isExecuted.current = true;

        // Consultation 데이터 조회
        const fetchedConsultations =
          await consultationDao.getAllConsultations();
        setConsultations(fetchedConsultations);

        // Client 데이터 조회
        const fetchedClients = await clientDao.getAllClients();
        setClients(fetchedClients);
      }
    };

    setupDatabase().catch(console.error);
  }, []);

  const handleAddConsultation = async () => {
    if (title && consultationTime && selectedClientId) {
      const consultationDao = new ConsultationDao();
      await consultationDao.insertConsultation({
        client_id: selectedClientId, // 선택된 client_id
        title,
        detailed_content: "Default content",
        consultation_time: consultationTime,
        consultation_address: "Default address",
        consultation_address_detail: "Default address detail",
        created_at: new Date().toISOString(),
      });

      const fetchedConsultations = await consultationDao.getAllConsultations();
      setConsultations(fetchedConsultations);

      // 입력 필드 초기화
      setTitle("");
      setConsultationTime("");
      setSelectedClientId(null);
    }
  };

  const handleDeleteConsultation = async (id: number) => {
    const consultationDao = new ConsultationDao();
    await consultationDao.deleteConsultation(id);

    const fetchedConsultations = await consultationDao.getAllConsultations();
    setConsultations(fetchedConsultations);
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

        // Consultation 데이터 조회
        const fetchedConsultations =
          await consultationDao.getAllConsultations();
        setConsultations(fetchedConsultations);

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
      <h1>Consultation Management</h1>

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
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Consultation Time (YYYY-MM-DD HH:mm:ss)"
          value={consultationTime}
          onChange={(e) => setConsultationTime(e.target.value)}
        />

        {/* Client 선택 드롭다운 */}
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

        <button onClick={handleAddConsultation}>Add Consultation</button>
      </div>

      <h2>Consultations</h2>
      <ul>
        {consultations.map((consultation, index) => (
          <li key={index}>
            {`${consultation[1]} (Time: ${consultation[4]})`}
            <button onClick={() => handleDeleteConsultation(consultation[0])}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConsultationPage;
