"use client";

export function rememberUserEmail(email: string) {
  Storage.setValue("ccrm-email", email);
}
export function getRememberedUserEmail() {
  return Storage.getValue("ccrm-email") ?? "";
}

export function deleteRememberedUserEmail() {
  Storage.remove("ccrm-email");
}

/* NOTE: localStorage를 한번 래핑 */
const Storage = {
  remove(key: string) {
    return localStorage.removeItem(key);
  },
  getValue(key: string) {
    return localStorage.getItem(key);
  },
  setValue(key: string, value: string) {
    return localStorage.setItem(key, value);
  },
  getJSON(key: string) {
    const result = localStorage.getItem(key);
    if (result === null) {
      return null;
    }

    const canParseJson = isValidJSON(result);

    if (!canParseJson) {
      throw new Error("can not parse json error");
    }

    return JSON.parse(result);
  },
  setJSON(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  },
};

/* NOTE: JSON.parse 가능 여부 체크용 함수 */
const isValidJSON = (jsonString: string) => {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (e) {
    return false;
  }
};
