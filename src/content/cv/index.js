import React from "react";
import Helmet from "react-helmet";
import Svg from "react-svg-inline";
import twitterSvg from "../../icons/iconmonstr-twitter-1.svg";
import githubSvg from "../../icons/iconmonstr-github-1.svg";
import emailSvg from "../../icons/iconmonstr-email-3.svg";
import globeSvg from "../../icons/iconmonstr-globe-3.svg";
import { formatSimpleDate } from "../../site/util/dateFormats";
import cvCss from "./cv.scss";
import makeHelmet from "../../site/util/makeHelmet";
import { withSite } from "../../site/Site";

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
    <time>{formatSimpleDate(children)}</time>
  ) : (
    <time>aujourd'hui</time>
  );

const Experience = ({ startDate, endDate, title, type, children }) => (
  <Line
    left={
      <div>
        <h3>{title}</h3>
        <div className="small">
          <Time>{startDate}</Time> – <Time>{endDate}</Time>
        </div>
        {type ? <div className="small">{type}</div> : null}
      </div>
    }
  >
    {children}
  </Line>
);

const SectionExperienceProfessionnelle = () => (
  <Section title="Expérience Professionnelle">
    <Experience
      startDate={new Date("2018-12-01")}
      title="Front-Commerce"
      type="Remote"
    >
      <h4>
        Création et maintenance d'un outil pour les développeurs dédié à la mise
        en place de boutiques e-commerce headless
      </h4>
      <ul>
        <li>Création d'un thème e-commerce (React, Sass, Apollo, SSR...)</li>
        <li>Mise à disposition d'un Design System (Storybook)</li>
        <li>Création d'une API GraphQL (NodeJS)</li>
        <li>Gestion des mises à jour et des processus de migration</li>
      </ul>
      <h4>Formation et support auprès des équipes utilisant le produit</h4>
      <ul>
        <li>Sessions de formation en présentiel ou à distance</li>
        <li>
          Support technique et aide à l'avant vente auprès des partenaires
        </li>
        <li>Rédaction technique pour la documentation du produit</li>
      </ul>
      <h4>Veille et R&D</h4>
      <ul>
        <li>Veille importante autour de l'écosystème front-end</li>
        <li>
          Suivi des bonnes pratiques (WebPerfs, Accessibilité, PWAs, etc.)
        </li>
        <li>Moteur au sujet des décisions techniques</li>
      </ul>
    </Experience>
    <Experience
      startDate={new Date("2016-03-07")}
      endDate={new Date("2020-02-01")}
      title="Occitech"
    >
      <h4>Réalisation d'applications web spécifiques (React, PHP, Symfony…)</h4>
      <ul>
        <li>Étude du besoin et conseils de solutions</li>
        <li>Mise en place de systèmes complexes (Event Sourcing, CQRS…)</li>
      </ul>

      <h4>Mise en avant de la culture front-end au sein de l'agence</h4>
      <ul>
        <li>Formation et encadrement des développeurs juniors</li>
        <li>Amélioration de la qualité de nos prestations front-end</li>
      </ul>

      <h4>Maintenance d'applications E-commerce (Magento, PHP)</h4>
    </Experience>

    <Experience
      startDate={new Date("2015-05-01")}
      endDate={new Date("2016-03-01")}
      title="Capgemini"
    >
      <h4>
        Front-Office d’une application web pour le Ministère de la Défense (PHP,
        Symfony)
      </h4>
    </Experience>

    <Experience
      startDate={new Date("2014-04-01")}
      endDate={new Date("2014-09-01")}
      title="Kerdos-Energy"
    >
      <h4>
        Stage &ndash; Création d'une plateforme de recensement des solutions
        d’optimisation en énergie (PHP, MySQL)
      </h4>
    </Experience>
  </Section>
);

const Formation = ({ startDate, endDate, children }) => (
  <Line
    left={
      <div className="time time--alone">
        <Time>{startDate}</Time> – <Time>{endDate}</Time>
      </div>
    }
  >
    {children}
  </Line>
);

const SectionFormation = () => (
  <Section title="Formation">
    <Formation
      startDate={new Date("2012-09-01")}
      endDate={new Date("2015-10-01")}
    >
      <h3 class="h4">
        École Internationale des Sciences du Traitement de l’Information - EISTI
      </h3>
      <p>
        <a href="http://www.eisti.fr">http://www.eisti.fr</a> - option
        Ingénierie du Cloud Computing
      </p>
    </Formation>
    <Formation
      startDate={new Date("2010-09-01")}
      endDate={new Date("2012-07-01")}
    >
      <h3 class="h4">
        Classes Préparatoires aux Grandes Écoles, Mathématiques et Physique
        (M.P.)
      </h3>
      <p>Lycée Louis Barthou à Pau</p>
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
  <Section title="Conférences (non exhaustif)">
    <Conference
      date={new Date("2020-09-27")}
      conf={<a href="https://france.sveltesociety.dev/">Svelte Society FR</a>}
      theme={["Svelte", "Intl", "Rollup", "Babel"]}
    >
      <h4>Internationaliser son application pour seulement 1kb de JS</h4>
      <p>
        <a href="https://www.youtube.com/watch?v=aY-e0Ph4ub0">
          https://www.youtube.com/watch?v=aY-e0Ph4ub0
        </a>
      </p>
    </Conference>
    <Conference
      date={new Date("2018-11-20")}
      conf={
        <a href="https://react-toulouse.js.org/meetup/4/">React Toulouse</a>
      }
      theme={["Storybook", "React", "Design System"]}
    >
      <h4>Passer de Storybook à un Design System</h4>
      <p>
        <a href="https://www.youtube.com/watch?v=lVwTOb9Nn18">
          https://www.youtube.com/watch?v=lVwTOb9Nn18
        </a>
      </p>
    </Conference>
    <Conference
      date={new Date("2017-06-12")}
      conf={<a href="http://toulouse.aperoweb.fr/">Aperoweb Toulouse</a>}
      theme={["Animation", "FLIP", "Performance"]}
    >
      <h4>Animations Performantes</h4>
      <p>
        <a href="https://julienpradet.github.io/slides/animations-performantes/">
          https://julienpradet.github.io/slides/animations-performantes/
        </a>
      </p>
    </Conference>
  </Section>
);

const Projet = ({ children, name }) => (
  <Line left={<h3>{name}</h3>}>{children}</Line>
);

const SectionProjets = () => (
  <Section title="Projets et Expériences Personnelles">
    <Projet name="Blog">
      <h4>
        <a href="https://www.julienpradet.fr/">https://www.julienpradet.fr/</a>
      </h4>
      <p>
        J'y partage mes connaissances et mes expériences dans le domaine du web.
      </p>
    </Projet>
    <Projet name="Ter Aelis">
      <h4>
        <a href="http://ter-aelis.fr/">http://ter-aelis.fr/</a>
      </h4>
      <p>
        Réalisation d'un forum communautaire en Symfony pour une association
        d'artistes.
      </p>
    </Projet>
    <Projet name="Side projects">
      <h4>
        <a href="https://github.com/JulienPradet">
          https://github.com/JulienPradet
        </a>
      </h4>
      <p>
        Je publie régulièrement des projets sur github qui me servent de terrain
        de jeu pour découvrir de nouvelles technologies. (Bibliothèque
        d'animation, Outil pour Design System,{" "}
        <abbr title="Générateur de Site Statique">GSS</abbr>…)
      </p>
    </Projet>
  </Section>
);

const Competence = ({ type, children }) => (
  <Line left={<h3>{type}</h3>}>{children}</Line>
);

const SectionCompetences = () => (
  <Section title="Compétences techniques">
    <Competence type="Concepts">
      <p>
        Programmation Fonctionnelle, Programmation Réactive,{" "}
        <abbr title="Programmation Orienté Objet">POO</abbr>
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
  <Section title="Informations Complémentaires">
    <Info type="Langues">
      <p>Français (langue maternelle), Anglais (TOEIC : 945/990)</p>
    </Info>
    <Info type="Loisirs">
      <p>
        Illustration, Graphisme et Sculpture (
        <a href="http://dev.vlynn.fr/folio/">http://dev.vlynn.fr/folio/</a>)
      </p>
      <ul>
        <li>2D : Photoshop, Illustrator</li>
        <li>3D : Blender, Argile</li>
      </ul>
    </Info>

    <Info type="Divers">
      <p>Permis B</p>
      <p>
        Neuf ans à l'étranger&nbsp;: Écosse, Indonésie, Émirats Arabes Unis
        (Dubaï)
      </p>
    </Info>
  </Section>
);

const Cv = props => {
  const helmet = makeHelmet(props);

  return (
    <div className="page">
      <Helmet>
        <html lang="fr-fr" />
        <link rel="alternate" href="/en/cv" hreflang="en-us" />
        <link rel="preload" as="style" href={cvCss} />
        <link rel="stylesheet" href={cvCss} />
      </Helmet>
      {helmet}
      <header className="head">
        <div>
          <h1 className="page__title">Julien Pradet</h1>
          <h2 className="page__subtitle">
            Ingénieur&nbsp;Web Full&nbsp;Stack (Spécialisé&nbsp;Front&nbsp;End)
          </h2>
        </div>
        <ul className="contact">
          <li class="screen-only">
            <a href="/en/cv/" hreflang="en-us" lang="en">
              <span className="name">
                Switch to <strong>english</strong> version
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
        Mes valeurs sont la <strong>bienveillance</strong> et le{" "}
        <strong>partage</strong>.<br />
        Mes atouts sont mon <strong>empathie</strong>, mon{" "}
        <strong>esprit d'équipe</strong> et mon <strong>autonomie</strong>.
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
