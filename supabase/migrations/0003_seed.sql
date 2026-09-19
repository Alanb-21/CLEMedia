-- Seed. Only values the client has actually supplied, plus the flags the
-- application needs to boot. No invented copy, claims, bios or categories.

insert into public.settings (key, value) values
  ('app', '{"launched": false, "target_window": "Mid-October 2026"}'::jsonb),
  ('links', '{"show_site": "https://www.pawsitivepugs.com", "social": {}}'::jsonb),
  ('integrations', '{"msocial_webhook_enabled": false, "msocial_webhook_url": null}'::jsonb)
on conflict (key) do nothing;

-- People, from the brand kit credits. Every row is flagged unconfirmed: a film
-- credit is not necessarily how someone wants to be named on a company site,
-- and no biography has been supplied. QUESTIONS.md #5.
insert into public.people (name, role, type, sort_order, visible, unconfirmed) values
  ('Conor Sexton',   'Founder · Director of Business Strategy', 'team',    1, true, true),
  ('Lydia Harding',  'Co-Producer',                             'team',    2, true, true),
  ('Al Compton',     'Creative Director · Written & Directed By','team',   3, true, true),
  ('Paula Walshe',   'Educational Content Advisor',             'advisor', 1, true, true),
  ('Kirstie Harding','Early Learning Advisor',                  'advisor', 2, true, true)
on conflict do nothing;

-- Journal categories are NOT seeded. The four names are unconfirmed
-- (QUESTIONS.md #8) and inventing them would put fabricated taxonomy in front
-- of the client. They are added in the admin panel once named.
