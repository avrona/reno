import Result, { Results } from '@/components/Result'
import { useMemo } from 'react'
import css from './css/convertToJs'
import { encodeDottedName, encodeSituation } from './publicodes/situationUtils'
import { Avis, ExplicationCommune } from './explications/Éligibilité'
import AutresAides from './AutresAides'
import { CustomQuestionWrapper } from './CustomQuestionUI'
import Image from 'next/image'
import checkIcon from '@/public/check.svg'

export default function MPRSelector({
  setSearchParams,
  situation,
  currentQuestion,
  answeredQuestions,
  rules,
  engine,
}) {
  const nextLink = (value) => {
    const url = setSearchParams(
      { objectif: encodeDottedName(value) },
      'url',
      false,
    )
    return url
  }

  const [mpraEvaluation, mprgEvaluation] = useMemo(() => {
      const newEngine = engine.setSituation(situation)
      return [
        newEngine.evaluate('MPR . accompagnée'),
        newEngine.evaluate('MPR . non accompagnée'),
      ]
    }, [situation, engine]),
    mpra = mpraEvaluation.nodeValue,
    mprg = mprgEvaluation.nodeValue
  console.log(
    'result 2',
    mpraEvaluation,
    mprgEvaluation,
    engine.evaluate('gestes . ventilation . double flux').nodeValue,
  )

  const both = mpra && mprg,
    none = !mpra && !mprg,
    some = mpra || mprg
  return (
    <CustomQuestionWrapper>
      <header>
        <small>Découvrez vos aides</small>
        <h2>
          {some ? (
            <span
              css={`
                display: flex;
                align-items: center;
                img {
                  margin-right: 0.4rem;
                  width: 1.8rem;
                  height: auto;
                }
              `}
            >
              <Image src={checkIcon} alt="Icône case cochée" /> Bonne nouvelle !
            </span>
          ) : (
            'Votre éligibilité'
          )}
        </h2>
      </header>
      {none ? (
        <div>
          <p
            css={`
              text-decoration: underline;
              text-decoration-color: salmon;
            `}
          >
            Vous n'êtes pas éligible aux aides Ma Prime Rénov.
          </p>

          <ExplicationCommune {...{ situation, engine }} />
        </div>
      ) : mpra && !mprg ? (
        <p>
          Vous êtes éligible au parcours accompagné. Vous n'êtes pas éligible au
          parcours par geste.
        </p>
      ) : !mpra && mprg ? (
        <p>
          Vous n'êtes pas éligible au parcours accompagné. Vous êtes cependant
          éligible au parcours par geste.
        </p>
      ) : (
        both && (
          <div>
            <p>
              Vous êtes éligible aux deux parcours, le parcours accompagné et le
              parcours par gestes.
            </p>
            <p>Vous devez choisir l'un des deux parcours.</p>
            <Avis {...{ situation, engine }} />
          </div>
        )
      )}

      <Results>
        <Result
          index={1}
          key={'acc'}
          situation={situation}
          {...{
            engine: engine.setSituation(situation),
            isFinal: !currentQuestion,
            rules,
            dottedName: 'MPR . accompagnée',
            url: nextLink(`MPR . accompagnée`),
          }}
        />
        <Result
          index={2}
          key={'non acc'}
          situation={situation}
          {...{
            engine: engine.setSituation(situation),
            isFinal: !currentQuestion,
            dottedName: 'MPR . non accompagnée',
            hideNumeric: true,
            rules,
            url: nextLink(`MPR . non accompagnée`),
          }}
        />
      </Results>
      <AutresAides />
    </CustomQuestionWrapper>
  )
}
