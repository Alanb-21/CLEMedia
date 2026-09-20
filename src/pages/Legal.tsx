import { Seo } from "@/components/Seo";
import { Container, Kicker, Panel, Section } from "@/components/ui";

type Doc = { title: string; description: string; intro: string; sections: { h: string; p: string[] }[] };

/**
 * Draft policies, written to be reviewed by a solicitor before launch rather
 * than published as they stand. An Irish company selling digital goods into
 * the EU has obligations these drafts summarise but do not settle.
 */
const DOCS: Record<"privacy" | "terms" | "cookies", Doc> = {
  privacy: {
    title: "Privacy policy",
    description: "How CLÉ Family Media handles personal data.",
    intro:
      "We collect as little as we can get away with, we tell you what we have, and we do not sell any of it. This policy explains the detail.",
    sections: [
      { h: "Who we are", p: [
        "CLÉ Family Media is the data controller for this website. Our registered company details and address are set out at the foot of this page once registration details are confirmed. You can reach us through the contact page for any question about your data.",
      ]},
      { h: "What we collect", p: [
        "If you send us an enquiry, we collect your name, email address, any organisation you give us and the content of your message. If you ask to be told when the app launches, we collect your email address and nothing else.",
        "If you buy a printable, Stripe handles your payment and collects your email for its own receipt. We never see or store your card details. We store a record of the purchase and a download token so we can deliver the file you paid for.",
        "We do not ask anyone to create an account, and we do not knowingly collect personal data from children.",
      ]},
      { h: "Why we collect it", p: [
        "Enquiry details are used to reply to you. Launch notifications are used to send you one email at launch. Purchase records are used to deliver your file and to keep proper accounts.",
        "We do not use any of it for advertising, we do not build profiles, and buying something from us does not add you to a mailing list.",
      ]},
      { h: "Legal basis", p: [
        "We rely on legitimate interest to answer enquiries you send us, consent for launch notifications, contract for delivering a purchase, and legal obligation for keeping financial records.",
      ]},
      { h: "Who we share it with", p: [
        "Our hosting and database providers, our payment processor and our email delivery provider, each only to the extent needed to run the site. We do not sell or rent personal data to anyone, for any purpose.",
      ]},
      { h: "How long we keep it", p: [
        "Enquiries are kept while the conversation is live and for a reasonable period afterwards. Purchase records are kept as long as accounting rules require. Launch notification addresses are deleted once the launch email has been sent.",
      ]},
      { h: "Your rights", p: [
        "Under the GDPR you can ask us for a copy of your data, ask us to correct or delete it, object to how we use it, or ask us to restrict that use. Contact us and we will action it. If you are not satisfied you can complain to the Irish Data Protection Commission.",
      ]},
      { h: "Changes to this policy", p: [
        "If this policy changes we will update this page and change the date below. Material changes will be flagged clearly rather than slipped in.",
      ]},
    ],
  },
  terms: {
    title: "Terms",
    description: "The terms covering use of this site and the sale of digital goods.",
    intro:
      "Short version: use the site sensibly, what you buy is for your own family or classroom, and we will deal with you fairly if something goes wrong.",
    sections: [
      { h: "Using this site", p: [
        "You are welcome to read, link to and share anything on this site. You may not copy it wholesale and present it as your own, or use it to train a model without asking us first.",
      ]},
      { h: "Buying a digital product", p: [
        "Prices are shown in euro and include any applicable tax. Payment is handled by Stripe. You do not need an account. When your payment succeeds you get a download link valid for twenty four hours and up to five downloads, so please save the file somewhere safe.",
      ]},
      { h: "Licence and permitted use", p: [
        "Printables are licensed for personal, family, classroom or childcare setting use. You may print as many copies as that use needs. You may not resell them, redistribute the files, or include them in a paid product of your own.",
      ]},
      { h: "Refunds and withdrawal", p: [
        "Digital downloads are supplied immediately, and under EU consumer rules the right of withdrawal ends once the download begins. That said, if a file is faulty, wrong, or will not open, contact us and we will fix it or refund you.",
      ]},
      { h: "Intellectual property", p: [
        "The Pawsitive Pugs & Pals®, PupsPlayer™, the characters, artwork and all content on this site belong to CLÉ Family Media unless stated otherwise.",
      ]},
      { h: "Liability", p: [
        "We take care over this site and its products, but we provide them as they are. Nothing in these terms limits liability for death, personal injury or fraud, or affects your statutory rights as a consumer.",
      ]},
      { h: "Governing law", p: [
        "These terms are governed by the law of Ireland, and the Irish courts have jurisdiction over any dispute arising from them.",
      ]},
    ],
  },
  cookies: {
    title: "Cookie policy",
    description: "What this site stores in your browser and why.",
    intro:
      "This site is deliberately light on tracking. There is no advertising network here and nothing following you around the internet afterwards.",
    sections: [
      { h: "What we use", p: [
        "Strictly necessary storage only, for things like keeping an administrator signed in and remembering a choice you made on a form. These are required for the site to work and cannot be switched off.",
      ]},
      { h: "Payments", p: [
        "When you buy something, Stripe sets its own cookies to process the payment and prevent fraud. Those are governed by Stripe's privacy policy.",
      ]},
      { h: "Analytics", p: [
        "We measure how the site is used in aggregate so we know which pages are worth improving. Our preference is a privacy first, cookieless tool that collects no personal data and needs no consent banner. If that changes, this page changes first and a consent banner appears with it.",
      ]},
      { h: "Managing cookies", p: [
        "You can clear or block cookies in your browser settings at any time. Blocking the strictly necessary ones may stop parts of the site working, but nothing on the public site depends on them.",
      ]},
    ],
  },
};

export default function Legal({ doc }: { doc: keyof typeof DOCS }) {
  const d = DOCS[doc];
  return (
    <>
      <Seo title={d.title} description={d.description} path={`/${doc}`} />
      <Section>
        <Container>
          <div className="max-w-[68ch]">
            <Kicker>Legal</Kicker>
            <h1 className="mt-5 text-[length:var(--text-h1)]">{d.title}</h1>
            <p className="mt-5 font-body text-[length:var(--text-lead)] leading-relaxed">{d.intro}</p>

            <Panel tone="warm" className="mt-8 border-l-[3px] !border-l-red p-5">
              <p className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-red-deep">
                Draft, pending legal review
              </p>
              <p className="mt-2 font-body text-[14.5px] text-ink">
                This is a working draft written to be reviewed by a solicitor before launch. It
                should not be relied on as it stands.
              </p>
            </Panel>

            <div className="mt-12 space-y-10">
              {d.sections.map((s) => (
                <section key={s.h}>
                  <h2 className="text-[length:var(--text-h3)]">{s.h}</h2>
                  <div className="mt-3 space-y-4 font-body text-[15.5px] leading-relaxed">
                    {s.p.map((para, i) => <p key={i}>{para}</p>)}
                  </div>
                </section>
              ))}
            </div>

            <p className="mt-12 border-t border-hairline pt-5 font-body text-[13px] text-muted">
              Last updated {new Date().toLocaleDateString("en-IE", { year: "numeric", month: "long" })}.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
