import FromStorageSimulationButton from '@/components/FromStorageSimulationButton'
import { CTA, CTAWrapper, Intro, PageBlock } from '@/components/UI'
import css from '@/components/css/convertToJs'
import { Content, Wrapper } from '@/components/explications/ExplicationUI'
import illustrationAccueilWatermark from '@/public/illustration-accueil-watermark.png'
import logoFranceRenov from '@/public/logo-france-rénov.png'
import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface'
import Image from 'next/image'
import Link from 'next/link'
import {
  HeaderWrapper,
  HomeList,
  Labels,
  LandingGreenBanner,
} from './LandingUI'

export const description = `Calculez les aides Ma Prime Rénov' 2024 pour la rénovation de votre logement.`

export const metadata: Metadata = {
  title: 'Mes aides réno 2024',
  description,
}

export default function Page() {
  return (
    <main
      style={css`
        background: white;

        padding-top: calc(1.5vh + 1.5vw);
      `}
    >
      <PageBlock>
        <HeaderWrapper>
          <Image
            src={illustrationAccueilWatermark}
            alt="Des ouvriers peignent et réparent la facade d'une maison"
          />
          <div>
            <Labels>
              {['⚡️ En 2024, les aides évoluent'].map((text) => (
                <li key={text}>{text}</li>
              ))}
            </Labels>
            <h1
              style={css`
                margin-top: 0.6rem;
              `}
            >
              Estimez vos aides pour rénover votre logement
            </h1>
            <Intro>
              <p>
                Des factures moins élevées dans un logement plus confortable et
                plus écologique.
              </p>
            </Intro>
            <CTAWrapper $justify="left">
              <CTA $fontSize="normal">
                <Link href="/simulation">➞&nbsp;&nbsp;C'est parti !</Link>
              </CTA>
            </CTAWrapper>
            <p
              style={css`
                margin: 0;
                margin-top: -1rem;
                color: #555;
                line-height: 1.3rem;
              `}
            >
              <strong>5 minutes chrono</strong> et sans inscription.
            </p>
            <FromStorageSimulationButton />
          </div>
        </HeaderWrapper>
        <LandingGreenBanner>
          <div>
            <Image src={logoFranceRenov} />
            <p>
              Une initiative construite avec{' '}
              <a href="https://france-renov.gouv.fr">France&nbsp;Rénov'</a> pour
              simplifier l’accès à l’information sur les aides à la rénovation
              énergétique.
            </p>
            <p>
              <Link
                href="/a-propos"
                style={css`
                  white-space: nowrap;
                `}
              >
                En savoir plus.
              </Link>
            </p>
          </div>
        </LandingGreenBanner>
        <Wrapper $background="white" $noMargin={true} $last={true}>
          <Content>
            <HomeList>
              <li>
                <strong>1</strong>
                <h3>Je réponds à un questionnaire simplifié</h3>
                <p>
                  6 questions pour évaluer votre éligibilité et estimer le
                  montant le vos aides.
                </p>
              </li>
              <li>
                <strong>2</strong>
                <h3>Je découvre le montant de mes aides</h3>
                <p>
                  Et j’affine mon projet pour obtenir un montant d’enveloppe
                  global pour mes travaux.
                </p>
              </li>
              <li>
                <strong>3</strong>
                <h3>J’exporte le résultat de ma simulation</h3>
                <p>
                  Pour le partager avec mon conseiller local France Rénov’, mes
                  proches ou mes artisans.
                </p>
              </li>
            </HomeList>
          </Content>
        </Wrapper>
      </PageBlock>
    </main>
  )
}
