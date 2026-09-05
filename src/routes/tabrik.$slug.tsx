import { createFileRoute, notFound } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { GreetingStory } from "@/components/greeting/GreetingStory";

export const Route = createFileRoute("/tabrik/$slug")({
  loader: async ({ params }) => {
    const { data, error } = await supabase
      .from("greetings")
      .select("recipient_name, sender_name")
      .eq("slug", params.slug)
      .maybeSingle();
    if (error || !data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.recipient_name} uchun tabrik — 1-oktyabr` : "Tabrik topilmadi" },
      {
        name: "description",
        content: "O'qituvchi va murabbiylar kuniga bag'ishlangan shaxsiy tabrik sahifasi.",
      },
      {
        property: "og:title",
        content: loaderData ? `${loaderData.recipient_name} uchun tabrik — 1-oktyabr` : "Tabrik",
      },
      {
        property: "og:description",
        content: "O'qituvchi va murabbiylar kuniga bag'ishlangan shaxsiy tabrik sahifasi.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GreetingRoute,
});

function GreetingRoute() {
  const data = Route.useLoaderData();
  return <GreetingStory recipient={data.recipient_name} sender={data.sender_name} />;
}
