import { Seo } from "@/components/Seo";
import { Container, Kicker, Lead, Panel, Section, SectionHeading } from "@/components/ui";
import { Settle } from "@/components/Settle";
import { IconInterview, IconMic, IconPress } from "@/components/icons";

const ROUTES = [
  { icon: IconInterview, title: "Interviews", body: "Conversations with Conor and the team about the company, the model and the state of children's media." },
  { icon: IconMic, title: "Podcasts", body: "Appearances on shows covering early years education, family media and Irish creative business." },
  { icon: IconPress, title: "Press", body: "Coverage of the company, the series and the app as it appears." },
];

export default function Media() {
  return (
    <>
      <Seo
        title="Media and podcast"
        description="Press coverage, interviews and podcast appearances featuring CLE Family Media and the team behind The Pawsitive Pugs and Pals."
        path="/media"
      />

      <Section className="!pb-10">
        <Container>
          <div className="max-w-[44ch]">
            <Kicker>Media</Kicker>
            <h1 className="mt-5 display-page font-display">Press and appearances</h1>
          </div>
          <Lead className="mt-6">
            Interviews, podcast appearances and coverage of the company and the show. Everything
            here links straight out to the original, and plays in place where the publisher allows it.
          </Lead>
        </Container>
      </Section>

      <Section className="!pt-0">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-3">
            {ROUTES.map((r) => (
              <Settle as="li" key={r.title}>
                <Panel className="h-full p-7 transition-transform duration-300 hover:-translate-y-1">
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-[var(--radius-card)] bg-white/70 text-red-deep hairline-ring">
                    <r.icon size={21} />
                  </span>
                  <h2 className="text-[18px] font-semibold">{r.title}</h2>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-slate">{r.body}</p>
                </Panel>
              </Settle>
            ))}
          </ul>

          <Panel tone="warm" className="mt-8 p-8">
            <SectionHeading
              kicker="Coming up"
              title="First appearances land later this year"
              lead="A UK podcast appearance is booked for December, with more to follow around the app launch. Entries appear here as they go out."
            />
            <p className="mt-6 max-w-[58ch] text-[14px] text-deep">
              Writing about the company and want to talk to someone? The press route on the contact
              page reaches us directly.
            </p>
          </Panel>
        </Container>
      </Section>
    </>
  );
}
