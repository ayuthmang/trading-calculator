import type { NextPage } from 'next'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'

const Home: NextPage = () => {
  const [capitalVal, setCapitalVal] = useState('')
  const [riskVal, setRiskVal] = useState('')
  const [buyPriceVal, setBuyPriceVal] = useState('')
  const [stopLossLevelVal, setStopLossLevelVal] = useState('')
  const [riskResult, setRiskResult] = useState('')
  const [noOfSharesResult, setNoOfSharesResult] = useState('')

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setStateFunc: Dispatch<SetStateAction<any>>
  ) => {
    if (e.currentTarget.validity.valid)
      setStateFunc(e.currentTarget.value.replace(/,/g, '.'))
  }

  useEffect(() => {
    const capitalNumber = BigNumber(capitalVal)
    const riskPercentageNumber = BigNumber(riskVal).dividedBy(100)
    const buyPriceNumber = BigNumber(buyPriceVal)
    const stopLossLevelNumber = BigNumber(stopLossLevelVal)

    // risk = capital * risk(%)
    const riskResultNumber = capitalNumber.multipliedBy(riskPercentageNumber)
    setRiskResult(riskResultNumber.toFixed(2))

    // no of shares = risk / (buy price - stop loss level)
    const noOfSharesBN = riskResultNumber.dividedBy(
      buyPriceNumber.minus(stopLossLevelNumber)
    )
    setNoOfSharesResult(noOfSharesBN.toFixed(2))
  }, [capitalVal, riskVal, buyPriceVal, stopLossLevelVal])

  console.log({
    capitalVal,
    riskVal,
    buyPriceVal,
    stopLossLevelVal,
    riskResult,
  })

  return (
    <>
      <label>
        Capital:{' '}
        <input
          inputMode="decimal"
          min="0"
          pattern="^[0-9]*[.,]?[0-9]{0,18}$"
          placeholder="0.00"
          onChange={(e) => handleInputChange(e, setCapitalVal)}
        />
      </label>
      <br />

      <label>
        Risk:{' '}
        <input
          inputMode="decimal"
          min="0"
          pattern="^[0-9]*[.,]?[0-9]{0,18}$"
          placeholder="0.00"
          onChange={(e) => handleInputChange(e, setRiskVal)}
        />{' '}
        %
      </label>
      <br />

      <label>
        Buy Price:{' '}
        <input
          inputMode="decimal"
          min="0"
          pattern="^[0-9]*[.,]?[0-9]{0,18}$"
          placeholder="0.00"
          onChange={(e) => handleInputChange(e, setBuyPriceVal)}
        />
      </label>
      <br />

      <label>
        Stop Loss Level:{' '}
        <input
          inputMode="decimal"
          min="0"
          pattern="^[0-9]*[.,]?[0-9]{0,18}$"
          placeholder="0.00"
          onChange={(e) => handleInputChange(e, setStopLossLevelVal)}
        />
      </label>
      <br />

      <p>Risk: {riskResult}</p>
      <p>No of shares: {noOfSharesResult}</p>
    </>
  )
}

export default Home
