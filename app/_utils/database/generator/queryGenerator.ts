"use client";

// 데이터 삽입 쿼리 생성 함수
export function generateInsertQuery(
  tableName: string,
  data: Record<string, any>
): string {
  const filteredData = Object.entries(data).reduce((acc, [key, value]) => {
    if (key !== "id") { 
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, any>);

  const columns = Object.keys(filteredData).join(", ");
  const values = Object.values(filteredData)
    .map((value) => {
      if (value === null || value === undefined) {
        return 'NULL'; // NULL 처리
      }
      return typeof value === "string" ? `'${value}'` : value;
    })
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
  whereClause?: string,
  columns?: string[]
): string {
  const selectedColumns = columns ? columns.join(", ") : "*";
  let query = `SELECT ${selectedColumns} FROM ${tableName}`;
  if (whereClause) {
    query += ` WHERE ${whereClause}`;
  }
  return query;
}

// 결과를 key-value로 매핑하는 함수
export function mapResultsToKeyValue(result: any): any[] {
  if (!result || !result.length || !result[0].columns) {
    return [];
  }

  const columns = result[0].columns;
  return result[0].values.map((row: any[]) => {
    const rowObject: Record<string, any> = {};
    columns.forEach((col: string, index: number) => {
      rowObject[col] = row[index];
    });
    return rowObject;
  });
}