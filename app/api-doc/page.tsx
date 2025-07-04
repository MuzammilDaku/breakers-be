// app/api/page.tsx
export const dynamic = "force-dynamic";

import { getApiDocs } from "@/lib/swagger";
import ReactSwagger from "./react-swagger";

export default async function SwaggerPage() {
  const spec = await getApiDocs();
  return (
    <section className="container">
      <ReactSwagger spec={spec} />
    </section>
  );
}
