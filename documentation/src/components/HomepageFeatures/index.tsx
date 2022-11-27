import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Pick Up',
    Svg: require('@site/static/img/api.svg').default,
    description: (
      <>
        Obsidian is easy learn. It can be integrated into new projects or
        adopted gradually in existing projects.
      </>
    ),
  },
  {
    title: 'Improves Code Structure',
    Svg: require('@site/static/img/prototype.svg').default,
    description: (
      <>
        Better understand relationships between objects to convert implicit dependencies into explicit.
      </>
    ),
  },
  {
    // title: 'Powered by React',
    title: 'Strongly Typed Dependency Injection Container that Scales as you grow',
    Svg: require('@site/static/img/stethoscope.svg').default,
    description: (
      <>
        Start small with a single dependency-graph, and create additional graphs as your app grows.
        {/* Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer. */}
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
