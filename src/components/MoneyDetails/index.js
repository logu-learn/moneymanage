// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {incomeAmount, expensesAmount} = props

  return (
    <div className="money-details-container">
      <div className="money-details-item-container balance-amount-container">
        <img
          className="money-details-img"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
        />
        <div className="money-details-data-container">
          <p className="money-detail-text">Your Balance</p>
          <p testid="balanceAmount" className="amount-text">
            Rs {incomeAmount - expensesAmount}
          </p>
        </div>
      </div>

      <div className="money-details-item-container income-amount-container">
        <img
          className="money-details-img"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
        />
        <div className="money-details-data-container">
          <p className="money-detail-text">Your Income</p>
          <p className="amount-text" testid="incomeAmount">
            Rs {incomeAmount}
          </p>
        </div>
      </div>

      <div className="money-details-item-container expenses-amount-container">
        <img
          className="money-details-img"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
        />
        <div className="money-details-data-container">
          <p className="money-detail-text">Your Expenses</p>
          <p className="amount-text" testid="expensesAmount">
            Rs {expensesAmount}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
