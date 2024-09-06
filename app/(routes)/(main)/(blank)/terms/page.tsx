import { redirect } from "next/navigation";

// 모달을 Intercept routes를 사용해서 구현할 경우 새로고침 혹은 주소창에 url 자체를 치면 not-found로 가진다.
// 이를 방지하기 위한 parallel route를 생성하고 redirect를 사용해 의도한 페이지로 유도한다.
// (솔직히 좋은 방법같지는 않다)
export default function TermsPage() {
  redirect("/");
  return null;
}
