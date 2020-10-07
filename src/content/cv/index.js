import React from "react";
import Helmet from "react-helmet";
import Svg from "react-svg-inline";
import twitterSvg from "../../icons/iconmonstr-twitter-1.svg";
import githubSvg from "../../icons/iconmonstr-github-1.svg";
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
  <Section title="Expérience Professionnelle">
    <Experience startDate={new Date("2018-12-01")} title="Front-Commerce">
      <h4>
        Création et maintenance d'un outil pour les dévelopeurs dédié à la mise
        en place de boutiques e-commerce headless
      </h4>
      <ul>
        <li>Création d'un thème e-commerce (React, Apollo, SSR...)</li>
        <li>Mise à disposition d'un Design System (Storybook)</li>
        <li>Création d'une API GraphQL (NodeJS)</li>
        <li>Gestion des mises à jour et des processus de migration</li>
      </ul>
      <h4>Formation et support auprès des équipes utilisant le produit</h4>
      <ul>
        <li>Sessions de formation en présentiel ou à distance (5 jours)</li>
        <li>
          Support technique et aide à l'avant vente auprès des partenaires
        </li>
        <li>Rédaction technique pour la documentation du produit</li>
      </ul>
      <h4>Veille et R&D</h4>
      <ul>
        <li>Veille importante autour de l'écosystème front-end</li>
        <li>Moteur au sujet des décisions techniques</li>
      </ul>
    </Experience>
    <Experience
      startDate={new Date("2016-03-07")}
      endDate={new Date("2020-02-01")}
      title="Occitech"
    >
      <h4>Réalisation d'applications web spécifiques</h4>
      <ul>
        <li>Étude du besoin et conseils de solutions</li>
        <li>Mise en place de systèmes complexes (Event Sourcing, CQRS, …)</li>
      </ul>

      <h4>Maintenance d'applications E-commerce sous Magento (PHP)</h4>
      <ul>
        <li>Création d'extensions personnalisées</li>
        <li>Création de thèmes complets</li>
        <li>Mise à niveau de boutiques sur les dernières versions Magento</li>
        <li>Correction d'anomalies</li>
      </ul>
    </Experience>

    <Experience
      startDate={new Date("2015-05-01")}
      endDate={new Date("2016-03-01")}
      title="Capgemini"
    >
      <h4>
        Front-Office d’une application web pour le Ministère de la Défense
      </h4>
      <ul>
        <li>
          Étude de faisabilité et Intégration d’un calendrier web (JavaScript)
        </li>
        <li>Intégration de la maquette (Sass)</li>
        <li>
          Développement des processus métiers du Front-Office (PHP, Symfony)
        </li>
      </ul>
    </Experience>

    <Experience
      startDate={new Date("2014-04-01")}
      endDate={new Date("2014-09-01")}
      title="Kerdos-Energy"
    >
      <h4>Plateforme de recensement des solutions d’optimisation en énergie</h4>
      <ul>
        <li>Restructuration du modèle de la base de données (MySQL)</li>
        <li>Refonte des outils d’enrichissement du contenu en ligne (PHP)</li>
        <li>
          Création d’un outil de calcul en ligne (PHP, Javascript, JQuery)
        </li>
      </ul>
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
  <Section title="Formation">
    <Formation
      startDate={new Date("2012-09-01")}
      endDate={new Date("2015-10-01")}
    >
      <h4>
        École Internationale des Sciences du Traitement de l’Information - EISTI
      </h4>
      <p>
        <a href="http://www.eisti.fr">http://www.eisti.fr</a> - option
        Ingénierie du Cloud Computing
      </p>
    </Formation>
    <Formation
      startDate={new Date("2010-09-01")}
      endDate={new Date("2012-07-01")}
    >
      <h4>
        Classes Préparatoires aux Grandes Écoles, Mathématiques et Physique
        (M.P.)
      </h4>
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
  <Section title="Conférences">
    <Conference
      date={new Date("2017-06-12")}
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
    <Conference
      date={new Date("2017-04-19")}
      conf={<a href="http://toulouse.aperoweb.fr/">GDG Toulouse</a>}
      theme={["React", "Bonnes pratiques"]}
    >
      <h4>Comment séparer ses composants&nbsp;?</h4>
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
      <h4>HOC pour Higher Order Components</h4>
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
      <h4>Coach React</h4>
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
  <Section title="Projets et Expériences Personnelles">
    <Projet name="Blog">
      <h4>
        <a href="https://www.julienpradet.fr/">https://www.julienpradet.fr/</a>
      </h4>
      <p>
        Ce blog est l'occasion pour moi de partager mes connaissances et mes
        expériences dans le domaine du web.
      </p>
    </Projet>
    <Projet name="React FLIP">
      <h4>
        <a href="https://github.com/JulienPradet/react-flip">
          https://github.com/JulienPradet/react-flip
        </a>
      </h4>
      <p>
        Une librairie simplifiant l'utilisation des{" "}
        <a href="https://www.julienpradet.fr/posts/introduction-aux-animations-flips">
          animations FLIP
        </a>{" "}
        en React.
      </p>
    </Projet>
    <Projet name="Pigment Store">
      <h4>
        <a href="https://github.com/JulienPradet/pigment-store">
          https://github.com/JulienPradet/pigment-store
        </a>
      </h4>
      <p>
        Un outil permettant de réaliser une documentation vivante d'une
        application React.
      </p>
    </Projet>
    <Projet name="Ter Aelis">
      <h4>
        <a href="http://teraelis.fr/">http://teraelis.fr/</a>
      </h4>
      <p>
        Réalisation d'un forum communautaire en Symfony pour une association
        d'artistes.
      </p>
    </Projet>
  </Section>
);

const Competence = ({ type, children }) => (
  <Line left={<h3>{type}</h3>}>{children}</Line>
);

const SectionCompetences = () => (
  <Section title="Compétences">
    <Competence type="Paradigmes">
      <p>Procédural, Object, Fonctionnel, Réactif, Logique</p>
    </Competence>
    <Competence type="Langages">
      <p>JavaScript (ES2015+), PHP, Java, OCaml</p>
    </Competence>
    <Competence type="Web">
      <p>React, RxJS, Babel, Webpack, Jest, Svelte, Gatsby, Next</p>
      <p>Symfony, CakePHP, Express (NodeJS)</p>
    </Competence>
  </Section>
);

const Info = ({ type, children }) => (
  <Line left={<h3>{type}</h3>}>{children}</Line>
);

const SectionInfoComplementaires = () => (
  <Section title="Informations Complémentaires">
    <Info type="Langues">
      Français (langue maternelle), Anglais (TOEIC : 945/990)
    </Info>
    <Info type="Loisirs">
      Illustration, Graphisme et Sculpture (
      <a href="http://dev.vlynn.fr/folio/">http://dev.vlynn.fr/folio/</a>)
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
          <li>
            <a href={`https://www.julienpradet.fr`}>
              <span className="name">https://www.julienpradet.fr</span>
            </a>
          </li>
          <li>
            <a href="mailto:julien.pradet@gmail.com">julien.pradet@gmail.com</a>
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
        <strong>partage</strong>.
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
