import css from '@/components/css/convertToJs'
import { formatValue } from '@/node_modules/publicodes/dist/index'
import { styled } from 'styled-components'

const colors = {
  success: {
    color: '#297254',
    background: '#c4fad5',
    label: 'Estimation finale',
  },
  running: { background: '#2a82dd', color: 'white', label: 'Sous conditions' },
  fail: { background: 'salmon', color: 'white', label: 'Non éligible' },
  waiting: { background: '#9f9f9f', color: 'white', label: 'À suivre' },
}

export default function Result({
  engine,
  isFinal,
  rules,
  dottedName,
  hideNumeric,
  index,
}) {
  const rule = rules[dottedName]
  const evaluation = engine.evaluate(dottedName)

  const value = formatValue(evaluation)
  const isNotApplicable =
    value === 'Non applicable' || evaluation.nodeValue === 0

  const { color, background, label } =
    colors[
      isNotApplicable
        ? 'fail'
        : isFinal
          ? 'success'
          : hideNumeric
            ? 'waiting'
            : 'running'
    ]

  return (
    <li
      style={css(`
        padding: 1.2vh;
        margin: 0 auto;
        width: 14rem;
		border: ${
      isFinal || isNotApplicable ? '2px solid' : '2px dashed'
    } ${background};
        ${isNotApplicable ? 'opacity: .7;' : ''}

		${
      isFinal || isNotApplicable
        ? `
        box-shadow:
          rgba(0, 0, 0, 0.12) 0px 1px 1px 0px,
          rgba(61, 59, 53, 0.16) 0px 0px 0px 1px,
          rgba(61, 59, 53, 0.08) 0px 2px 5px 0px;
		  `
        : ''
    } 
	position: relative;
	${hideNumeric ? `width: 12rem;` : ``}

      `)}
    >
      <span
        style={css(`
          line-height: 1.5rem;
          left: -2px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%) translateX(-50%);
          background: ${background};
          border-radius: 1rem;
          width: 1.6rem;
          height: 1.6rem;
          color: white;
          text-align: center;
        `)}
      >
        {index}
      </span>
      <InvisibleDetails open={false}>
        <summary>
          <h3
            style={css`
              font-size: 100%;
              font-weight: 500;
              margin: 0.15rem 0;
            `}
          >
            {rule.titre}
          </h3>
          <div
            style={css(`
			${hideNumeric ? 'display: none;' : ''}
          visibility: ${
            // TODO pour l'instant, on cache la valeur numérique de ce parcours, car on sait pas trop comment l'estimer, il faudrait définir un montant pour chaque geste, des m², un nombre de fenêtres etc.
            isNotApplicable ? 'hidden' : ''
          };
          margin: 0.15rem 0;
        `)}
          >
            {isFinal ? `` : `Jusqu'à `} {value}
          </div>
          <Badge $background={background}>{label}</Badge>
        </summary>
        <Explanation
          dangerouslySetInnerHTML={{ __html: rule.descriptionHtml }}
        />
      </InvisibleDetails>
    </li>
  )
}

const Explanation = styled.div`
  margin: 0.8rem 0;
  font-size: 90%;
`

export const Badge = styled.strong`
  padding: 0 0.2rem;
  background: ${(p) => p.$background};
  color: ${(p) => p.$color || 'white'};
`

export const Results = styled.ul`
  padding-left: 0;
  margin-top: 1rem;
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  @media (max-width: 800px) {
    flex-direction: column;
    > span {
      margin: 0.6rem;
    }
  }
`

const InvisibleDetails = styled.details`
  summary {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: help;
  }
`
