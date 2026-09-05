import { createFileRoute } from "@tanstack/react-router";
import { GreetingStory } from "@/components/greeting/GreetingStory";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ustozlarga Ehtirom — 1-oktyabr tabriklari" },
      {
        name: "description",
        content:
          "O'qituvchi va murabbiylar kuniga bag'ishlangan interaktiv hikoya-tabrik: gullar, yulduzlar va maxsus sovg'a bilan.",
      },
      { property: "og:title", content: "Ustozlarga Ehtirom — 1-oktyabr tabriklari" },
      {
        property: "og:description",
        content:
          "O'qituvchi va murabbiylar kuniga bag'ishlangan interaktiv hikoya-tabrik: gullar, yulduzlar va maxsus sovg'a bilan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <GreetingStory />;
}
