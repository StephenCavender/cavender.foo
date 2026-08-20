import { createOgMarkup, renderOgImage } from "../utils/og-image";

export async function GET() {
  const markup = createOgMarkup({
    title: "Steve's Site",
    subtitle: "Personal site of Steve Cavender",
  });

  return renderOgImage(markup);
}
