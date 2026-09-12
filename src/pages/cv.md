---
layout: ../layouts/BaseLayout.astro
---

# CV

Indiana, USA (Remote) | [s@cavender.foo](mailto:s@cavender.foo) | [linkedin.com/in/scavender](https://linkedin.com/in/scavender) | [cavender.foo](https://cavender.foo) | [github.com/stephencavender](https://github.com/stephencavender)

Check out 'Story Mode' on the [work](/work) page.

## Summary

Over 10 years of software engineering experience, leading development teams at startups and global tech firms (60–5,000+ employees, up to $29B+ revenue). Delivered iOS and Android apps for a veterinary software startup in under 2 months. Expertise in front-end development, cloud-based solutions, and automated testing, with a focus on enhancing user experience and accessibility.

**Technical Skills:** TypeScript, React, React Native, Expo, Next.js, NodeJS, AI/LLMs, Postgres, Prisma, Angular, Selenium, Playwright, Jenkins

## Professional Experience

### Otto — Austin, TX (Remote)

**Staff Software Engineer I** | Feb 2026 – Present<br />
**Senior Software Engineer II** | Dec 2023 – Feb 2026<br />
**Senior Software Engineer I** | Apr 2022 – Dec 2023

_Leading veterinary software company serving 8,000+ veterinary practices across North America._

- Served as technical lead for a 6-engineer team from Mar 2025; transitioned the team from Kanban to 2-week sprints, improving delivery predictability, and introduced AI-powered development tools into the team's workflow, working alongside engineers rather than mandating adoption, to boost productivity.
- Led delivery of the Hill's and Trupanion Inform partner programs as tech lead, building clinic enrollment flows and pet-parent execution flows end-to-end, and integrating the SyncVet API to streamline clinic onboarding.
- Led design and delivery of the Otto pet-parent mobile application (Expo/React Native, iOS + Android, 50k+ downloads), including OTP authentication and targeted push-notification reminders that reduced missed veterinary appointments; set up the release pipeline on Expo EAS Build/Submit for repeatable App Store and Google Play submissions.
- Built the Otto Inform campaign enrollment and account-management web application (React, functional components, Context API, no Redux) enabling veterinary practices to manage client communication campaigns and account settings end-to-end.
- Built the internal operations admin application (React) for practice support teams from the ground up, streamlining administrative workflows and operational oversight; the first iteration became foundational tooling for the team.
- Established the first end-to-end test suite for the Inform platform, giving the team automated coverage where there had previously been none.
- Built a shared widgets repository and embedded the widget into the pet portal, along with a conversations overlay, working across Next.js and tRPC after moving to a new delivery team.
- Contributed to 20+ backend and frontend repositories (Node.js services, React front-ends), ensuring seamless full-stack feature integration across the platform.
- Pushed back on building production campaigns against an unproven new event-emitter architecture; negotiated a compromise to build on the new system while holding launch until it was proven at scale, protecting delivery reliability under leadership pressure.
- Led the build of an internal AI workspace usable by both engineers and non-engineers, adding guardrails to prevent AI from mutating production data or deploying to production without human review, widening adoption without loosening the safety bar.

### BIAH | Pawru (via TEKsystems) — Duluth, GA (Remote)

**Senior Software Engineer** | Nov 2020 – Apr 2022

_Digital health startup building a client engagement platform for veterinary practices; dissolved in Apr 2022 when Boehringer Ingelheim partnered with Otto (then TeleVet), which extended offers to part of the team._

- Assessed a contractor-delivered React Native app that turned out to be a native shell wrapping a webview; the team rejected that approach and, once the contract engagement ended, rebuilt it as a fully native React Native app for iOS and Android.
- Shipped new features and critical bug fixes on the legacy PetPro Connect Ionic/Angular app in parallel with the rebuild, keeping the live product healthy throughout.
- Increased user engagement through data-driven, targeted email campaigns, boosting product adoption.
- Refactored NodeJS/Express-based file services to fix slow image load times at the service layer rather than adding server capacity, improving user experience while reducing server costs.

### Genesys — Indianapolis, IN

**Senior Software Engineer** | Apr 2020 – Nov 2020<br />
**Software Engineer** | Dec 2016 – Apr 2020

_Global leader in customer experience and contact center technology, serving 8,000+ organizations across 100+ countries._

- Developed front-end features for Interaction Connect (Angular) to enhance agent and customer experience.
- Engineered cloud-based Journey Mapping and Interaction Routing solutions using AltoCloud.
- Implemented WCAG 2.1 accessibility guidelines, expanding the platform's potential user base and improving usability scores.
- Designed and developed foundational features including Response Management and Agent Statistics.

### Interactive Intelligence (InIn) — Indianapolis, IN

**Software Engineer in Test** | Feb 2016 – Dec 2016<br />
**Associate Software Engineer in Test** | Jun 2014 – Feb 2016

_Customer engagement and communications software company acquired for $1.4B in 2016._

- Drove quality and reliability of Interaction Connect through automated testing and continuous integration.
- Streamlined virtual machine deployment for Selenium Grid-based test frameworks, improving scalability.
- Maintained and optimized Jenkins CI server, ensuring reliable execution of automated test suites.
- Wrote and maintained automated test suites using Selenium and the Page Object Model.

## Additional Experience

**Paragon Medical** — Pierceton, IN<br />
IT Support Engineer (Internship) | May 2013 – May 2014

**MicroByte Technologies** — North Webster, IN<br />
Web Developer, Computer Technician | Feb 2007 – Aug 2010

## Education

**Anderson University** — Anderson, IN<br />
BA Computer Science, 2014

## Projects

**[SimpleDex](/projects/simpledex)** — Pokémon evolution lookup app | React Native, Expo, TypeScript

- Designed, built, and shipped a cross-platform mobile app (iOS + Android) that surfaces Pokémon evolution requirements without wading through wiki text.
- Published to the App Store and Google Play; later delisted after developer accounts lapsed. Codebase and marketing site remain public.
- Repo: [github.com/StephenCavender/simpledex](https://github.com/StephenCavender/simpledex) | Site: [marketing.simpledex.cavender.dev](https://marketing.simpledex.cavender.dev)

**[GymButler](/projects/gymbutler)** — Workout tracking app | React Native, Expo, TypeScript

- Built and shipped a cross-platform mobile app for tracking gym workouts.
- Previously published to app stores; delisted after developer accounts lapsed. Codebase remains public; relaunch in progress.
- Repo: [github.com/StephenCavender/gymbutler](https://github.com/StephenCavender/gymbutler)

<style>
  /* The global `ul:not(article ul)` rule hides markers for nav-style link
     lists. A CV is scanned, not read, so restore real bullets here. */
  main ul:not(article ul) {
    padding-left: 1.5em;
    list-style-type: disc;
  }
  main ul:not(article ul) li {
    margin: 0.35em 0;
  }
</style>
