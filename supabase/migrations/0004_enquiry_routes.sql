-- The contact page now offers four routes, matching the client's handoff:
-- partnerships, educators and case studies, press, and general. The existing
-- check constraint would have rejected 'educator' outright.

alter table public.enquiries drop constraint if exists enquiries_route_check;

alter table public.enquiries
  add constraint enquiries_route_check
  check (route in ('general', 'partnership', 'educator', 'press', 'notify'));
