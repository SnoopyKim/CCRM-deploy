"use client";

// 데이터 삽입 쿼리 생성 함수
export function generateInsertQuery(
  tableName: string,
  data: Record<string, any>
): string {
  const columns = Object.keys(data).join(", ");
  const values = Object.values(data)
    .map((value) => (typeof value === "string" ? `'${value}'` : value))
    .join(", ");

  return `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;
}

// 데이터 업데이트 쿼리 생성 함수
export function generateUpdateQuery(
  tableName: string,
  data: Record<string, any>,
  whereClause: string
): string {
  const setClause = Object.keys(data)
    .map(
      (key) =>
        `${key} = ${
          typeof data[key] === "string" ? `'${data[key]}'` : data[key]
        }`
    )
    .join(", ");

  return `UPDATE ${tableName} SET ${setClause} WHERE ${whereClause}`;
}

// 데이터 삭제 쿼리 생성 함수
export function generateDeleteQuery(
  tableName: string,
  whereClause: string
): string {
  return `DELETE FROM ${tableName} WHERE ${whereClause}`;
}

// 데이터 조회 쿼리 생성 함수
export function generateSelectQuery(
  tableName: string,
  whereClause?: string
): string {
  let query = `SELECT * FROM ${tableName}`;
  if (whereClause) {
    query += ` WHERE ${whereClause}`;
  }
  return query;
}
