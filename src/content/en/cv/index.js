import React from "react";
import Helmet from "react-helmet";
import Svg from "react-svg-inline";
import twitterSvg from "../../../icons/iconmonstr-twitter-1.svg";
import githubSvg from "../../../icons/iconmonstr-github-1.svg";
import emailSvg from "../../../icons/iconmonstr-email-3.svg";
import globeSvg from "../../../icons/iconmonstr-globe-3.svg";
import { formatSimpleDate } from "../../../site/util/dateFormats";
import cvCss from "../../cv/cv.scss";
import makeHelmet from "../../../site/util/makeHelmet";
import { withSite } from "../../../site/Site";

const Section = ({ title, children }) => (
  <section>
    <h2>{title}</h2>
    {children}
  </section>
);

const Line = ({ left, children }) => (
  <div className="line">
    <div className="line__left">{left}</div>
    <div className="line__content">{children}</div>
  </div>
);

const Time = ({ children }) =>
  children ? (
    <time>{formatSimpleDate(children, "en-US")}</time>
  ) : (
    <time>today</time>
  );

const Experience = ({ startDate, endDate, title, children }) => (
  <Line
    left={
      <div>
        <h3>{title}</h3>
        <Time>{startDate}</Time> – <Time>{endDate}</Time>
      </div>
    }
  >
    {children}
  </Line>
);

const SectionExperienceProfessionnelle = () => (
  <Section title="Work Experience">
    <Experience startDate={new Date("2018-12-01")} title="Front-Commerce">
      <h4>
        A developer tool enabling the usage of headless eCommerce services
      </h4>
      <ul>
        <li>eCommerce themes (React, Apollo…)</li>
        <li>Advanced JavaScript tooling (Webpack, SSR, tests…)</li>
        <li>Design System (Storybook)</li>
        <li>Advanced GraphQL API (NodeJS, Redis, Elasticsearch…)</li>
      </ul>
      <h4>Lead the development of the tooling</h4>
      <ul>
        <li>
          Evaluted and recommended many of the technologies currently in use
        </li>
        <li>
          Kept the stack up to date, following the evolution of the ecosystem
        </li>
        <li>
          Always watching technologies around the front-end ecosystem
          (frameworks, bundlers, JAMStack, Web perf…)
        </li>
      </ul>
      <h4>
        Trained developers and provided support to the teams relying on our
        product
      </h4>
      <ul>
        <li>Remote and inhouse trainings</li>
        <li>Support and consulting on client cases</li>
        <li>Documentation and tutorials</li>
        <li>Provided easy to follow migration paths</li>
      </ul>
    </Experience>
    <Experience
      startDate={new Date("2016-03-07")}
      endDate={new Date("2020-02-01")}
      title="Occitech"
    >
      <h4>Developing web applications for external clients</h4>
      <ul>
        <li>
          Translated the business needs of the clients into technical solutions
        </li>
        <li>
          Adapted to complex environments using well architectured solutions
          (Event Sourcing, CQRS…)
        </li>
      </ul>

      <h4>Maintained eCommerce shops (Magento, PHP)</h4>
    </Experience>

    <Experience
      startDate={new Date("2015-05-01")}
      endDate={new Date("2016-03-01")}
      title="Capgemini"
    >
      <h4>
        Web Front-Office for one of the Ministry of the Armed Forces's services
        (PHP, Symfony)
      </h4>
    </Experience>

    <Experience
      startDate={new Date("2014-04-01")}
      endDate={new Date("2014-09-01")}
      title="Kerdos-Energy"
    >
      <h4>
        Internship &ndash; Developed a platform referencing solutions to improve
        energy consumptions (PHP, MySQL, Javascript)
      </h4>
    </Experience>
  </Section>
);

const Formation = ({ startDate, endDate, children }) => (
  <Line
    left={
      <div className="time">
        <Time>{startDate}</Time> – <Time>{endDate}</Time>
      </div>
    }
  >
    {children}
  </Line>
);

const SectionFormation = () => (
  <Section title="Education and Training">
    <Formation
      startDate={new Date("2012-09-01")}
      endDate={new Date("2015-10-01")}
    >
      <h4>
        École Internationale des Sciences du Traitement de l’Information - EISTI
      </h4>
      <p>
        Computer Science school delivering the renowned Engineer title in France
        <br />
        <a href="http://www.eisti.fr">http://www.eisti.fr</a>
      </p>
    </Formation>
    <Formation
      startDate={new Date("2010-09-01")}
      endDate={new Date("2012-07-01")}
    >
      <h4>Lycée Louis Barthou</h4>
      <p>
        Undergraduate studies to prepare for competitive entry exams to
        engineering schools
      </p>
    </Formation>
  </Section>
);

const Conference = ({ conf, date, children }) => (
  <Line
    left={
      <div>
        <h3>{conf}</h3>
        <Time>{date}</Time>
      </div>
    }
  >
    {children}
  </Line>
);

const SectionConferences = () => (
  <Section title="Conferences">
    <Conference
      date={new Date("2017-06-12")}
      conf={<a href="https://france.sveltesociety.dev/">Svelte Society FR</a>}
      theme={["Svelte", "Intl", "Rollup", "Babel"]}
    >
      <h4>How to translate your application for only 1kb of JS</h4>
      <p>
        <a href="https://www.youtube.com/watch?v=aY-e0Ph4ub0">
          https://www.youtube.com/watch?v=aY-e0Ph4ub0
        </a>
      </p>
    </Conference>
    <Conference
      date={new Date("2017-06-12")}
      conf={<a href="http://toulouse.aperoweb.fr/">Aperoweb Toulouse</a>}
      theme={["Animation", "FLIP", "Performance"]}
    >
      <h4>Performant animations</h4>
      <p>
        <a href="https://julienpradet.github.io/slides/animations-performantes/">
          https://julienpradet.github.io/slides/animations-performantes/
        </a>
      </p>
    </Conference>
    <Conference
      date={new Date("2017-04-19")}
      conf={<a href="http://toulouse.aperoweb.fr/">GDG Toulouse</a>}
      theme={["React", "Bonnes pratiques"]}
    >
      <h4>How to split your components?</h4>
      <p>
        <a href="https://julienpradet.github.io/slides/separtion-composants/">
          https://julienpradet.github.io/slides/separtion-composants/
        </a>
      </p>
    </Conference>
    <Conference
      date={new Date("2017-01-24")}
      conf={<a href="http://toulouse.aperoweb.fr/">ToulouseJS</a>}
      theme={["React", "Programmation Fonctionnelle"]}
    >
      <h4>HOC for Higher Order Components</h4>
      <p>
        <a href="https://julienpradet.github.io/slides/hoc/">
          https://julienpradet.github.io/slides/hoc/
        </a>
      </p>
    </Conference>
    <Conference
      date={new Date("2016-10-14")}
      theme={["React"]}
      conf={
        <a href="http://www.monkeytechdays.com/events/mktd-2">MonkeyTechDays</a>
      }
    >
      <h4>React Coach</h4>
      <p>
        <a href="https://github.com/monkeytechdays/mktd-2-exercices/tree/react-wording">
          https://github.com/monkeytechdays/mktd-2-exercices
        </a>
      </p>
    </Conference>
  </Section>
);

const Projet = ({ children, name }) => (
  <Line left={<h3>{name}</h3>}>{children}</Line>
);

const SectionProjets = () => (
  <Section title="Side Projects">
    <Projet name="Blog">
      <h4>
        <a href="https://www.julienpradet.fr/">https://www.julienpradet.fr/</a>
      </h4>
      <p>
        A blog where I share my knownledge and experiences related to the web.
      </p>
    </Projet>
    <Projet name="Ter Aelis">
      <h4>
        <a href="http://teraelis.fr/">http://teraelis.fr/</a>
      </h4>
      <p>Created a community forum using Symfony for an artists assocation.</p>
    </Projet>
    <Projet name="Technical Side Projects">
      <h4>
        <a href="https://github.com/JulienPradet">
          https://github.com/JulienPradet
        </a>
      </h4>
      <p>
        I often publish new projects on github to have a playground allowing me
        to discover new technologies. (Animation library, Design System tool,{" "}
        <abbr title="Static Site Generator">SSG</abbr>…)
      </p>
    </Projet>
  </Section>
);

const Competence = ({ type, children }) => (
  <Line left={<h3>{type}</h3>}>{children}</Line>
);

const SectionCompetences = () => (
  <Section title="Technical Skills">
    <Competence type="Paradigms">
      <p>
        Functional Programming, Reactive Programming,{" "}
        <abbr title="Object Oriented Programming">OOP</abbr>
      </p>
    </Competence>
    <Competence type="Langages">
      <p>JavaScript (ESNext), HTML, CSS, PHP, Java, OCaml</p>
    </Competence>
    <Competence type="Web">
      <p>React, RxJS, Babel, Webpack, Jest, Svelte, Next, Gatsby</p>
      <p>Symfony, Express, Fastify</p>
    </Competence>
  </Section>
);

const Info = ({ type, children }) => (
  <Line left={<h3>{type}</h3>}>{children}</Line>
);

const SectionInfoComplementaires = () => (
  <Section title="Additional information">
    <Info type="Languages">French (native), English (TOEIC: 945/990)</Info>
    <Info type="Hobbies">
      Illustration, Design and Sculpture (
      <a href="http://dev.vlynn.fr/folio/">http://dev.vlynn.fr/folio/</a>)
      <ul>
        <li>2D : Photoshop, Illustrator</li>
        <li>3D : Blender, Clay</li>
      </ul>
    </Info>

    <Info type="Divers">
      <p>Driving license</p>
      <p>
        Lived 9 years aboard: Scotland, Indonesia, United Arab Emirates (Dubaï)
      </p>
    </Info>
  </Section>
);

const Cv = props => {
  const helmet = makeHelmet(props);

  return (
    <div className="page">
      <Helmet>
        <html lang="en-us" />
        <link rel="alternate" href="/cv" hreflang="fr-fr" />
        <link rel="preload" as="style" href={cvCss} />
        <link rel="stylesheet" href={cvCss} />
      </Helmet>
      {helmet}
      <header className="head">
        <div>
          <h1 className="page__title">Julien Pradet</h1>
          <h2 className="page__subtitle">
            Full&nbsp;Stack Engineer (Focused on Front&nbsp;End)
          </h2>
        </div>
        <ul className="contact">
          <li class="screen-only">
            <a href="/cv/" hreflang="fr-fr" lang="fr">
              <span className="name">
                Afficher la version <strong>française</strong>
              </span>
            </a>
          </li>
          <li>
            <a href={`https://www.julienpradet.fr`}>
              <Svg svg={globeSvg} cleanup className="mobile-only" />
              <span className="name">https://www.julienpradet.fr</span>
            </a>
          </li>
          <li>
            <a href="mailto:julien.pradet@gmail.com">
              <Svg svg={emailSvg} cleanup className="mobile-only" />
              <span className="name">julien.pradet@gmail.com</span>
            </a>
          </li>
          <li>
            <a href={`https://twitter.com/JulienPradet`}>
              <Svg svg={twitterSvg} cleanup />
              <span className="name">@JulienPradet</span>
            </a>
          </li>
          <li>
            <a href={`https://github.com/JulienPradet/blog-posts`}>
              <Svg svg={githubSvg} cleanup />
              <span className="name">JulienPradet</span>
            </a>
          </li>
        </ul>
      </header>
      <p className="page__moto">
        I care about <strong>kindness</strong> and{" "}
        <strong>sharing knownledge</strong>.<br />I am an{" "}
        <strong>empathetic team player</strong> with strong communication
        skills.
      </p>
      <SectionExperienceProfessionnelle />
      <SectionFormation />
      <SectionCompetences />
      <SectionConferences />
      <SectionProjets />
      <SectionInfoComplementaires />
    </div>
  );
};

export default withSite(Cv);
