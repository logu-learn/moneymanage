import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'

import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

export default class MoneyManager extends Component {
  state = {
    transactionTitle: '',
    transactionAmount: '',
    transactionTypeId: transactionTypeOptions[0].optionId,
    transactionsList: [],
  }

  onTitleChange = titleChangeEvent => {
    const updatedTitle = titleChangeEvent.target.value

    this.setState({
      transactionTitle: updatedTitle,
    })
  }

  onAmountChange = amountChangeEvent => {
    const updatedAmount = amountChangeEvent.target.value

    this.setState({
      transactionAmount: updatedAmount,
    })
  }

  onTransactionTypeChange = transactionTypeChangeEvent => {
    const selectedTransactionTypeId = transactionTypeChangeEvent.target.value

    this.setState({
      transactionTypeId: selectedTransactionTypeId,
    })
  }

  onAddNewTransaction = addNewTransactionEvent => {
    addNewTransactionEvent.preventDefault()

    this.setState(previousTransactionsState => {
      const {
        transactionTitle,
        transactionAmount,
        transactionTypeId,
        transactionsList,
      } = previousTransactionsState
      const transactionTypeData = transactionTypeOptions.find(
        transactionTypeOption =>
          transactionTypeOption.optionId === transactionTypeId,
      )

      const newTransactionData = {
        id: uuidv4(),
        title: transactionTitle,
        amount: transactionAmount,
        type: transactionTypeData.displayText,
      }

      const updatedTransactionsList = [newTransactionData, ...transactionsList]

      const updatedState = {
        transactionTitle: '',
        transactionAmount: '',
        transactionTypeId: transactionTypeOptions[0].optionId,
        transactionsList: updatedTransactionsList,
      }

      return updatedState
    })
  }

  onTransactionDelete = transactionId => {
    this.setState(previousTransactionsState => {
      const {transactionsList} = previousTransactionsState

      const filteredTransactionsListWithoutDeletedEntry =
        transactionsList.filter(
          transactionsListItem => transactionsListItem.id !== transactionId,
        )

      return {
        transactionsList: filteredTransactionsListWithoutDeletedEntry,
      }
    })
  }

  getTotalTransactionsAmount = transactionType => {
    const {transactionsList} = this.state

    const filteredTransactionsList = transactionsList.filter(
      transactionListItem => transactionListItem.type === transactionType,
    )
    const totalTransactionsAmount = filteredTransactionsList.reduce(
      (intermediateAggregatedIncome, currentTransaction) =>
        intermediateAggregatedIncome + parseInt(currentTransaction.amount),
      0,
    )

    return totalTransactionsAmount
  }

  render() {
    const {
      transactionTitle,
      transactionAmount,
      transactionTypeId,
      transactionsList,
    } = this.state

    const totalIncome = this.getTotalTransactionsAmount('Income')
    const totalExpenses = this.getTotalTransactionsAmount('Expenses')

    return (
      <div className="money-manager-bg-container">
        <div className="money-manager-content-container">
          <div className="money-manager-header-container">
            <h1 className="money-manager-header-user-greeting">Hi, Richard</h1>
            <p className="money-manager-header-welcome-message">
              Welcome back to your{' '}
              <span className="money-manager-header-app-name-text">
                Money Manager
              </span>
            </p>
          </div>

          <MoneyDetails
            incomeAmount={totalIncome}
            expensesAmount={totalExpenses}
          />

          <div className="money-manager-transaction-container">
            <div className="add-transaction-container">
              <h1 className="transaction-container-header">Add Transaction</h1>
              <form
                className="form-input-container"
                onSubmit={this.onAddNewTransaction}
              >
                <label className="form-label" htmlFor="title">
                  TITLE
                </label>
                <input
                  id="title"
                  type="text"
                  className="form-input"
                  placeholder="TITLE"
                  value={transactionTitle}
                  onChange={this.onTitleChange}
                  autoComplete="off"
                />

                <label className="form-label" htmlFor="amount">
                  AMOUNT
                </label>
                <input
                  id="amount"
                  type="text"
                  className="form-input"
                  placeholder="AMOUNT"
                  value={transactionAmount}
                  onChange={this.onAmountChange}
                  autoComplete="off"
                />

                <label className="form-label" htmlFor="type">
                  TYPE
                </label>
                <select
                  id="type"
                  className="form-input"
                  value={transactionTypeId}
                  onChange={this.onTransactionTypeChange}
                >
                  {transactionTypeOptions.map(transactionTypeOption => (
                    <option value={transactionTypeOption.optionId}>
                      {transactionTypeOption.displayText}
                    </option>
                  ))}
                </select>

                <button type="submit" className="form-submit-button">
                  Add
                </button>
              </form>
            </div>

            <div className="transaction-history-container">
              <h1 className="transaction-container-header">History</h1>
              <div className="transaction-details-header">
                <p className="transaction-title-header">Title</p>
                <p className="transaction-detail-header">Amount</p>
                <p className="transaction-detail-header">Type</p>
                <p className="transaction-detail-header">{'    '}</p>
              </div>
              <ul className="transaction-details-container">
                {transactionsList.map(transactionsListItem => (
                  <TransactionItem
                    key={transactionsListItem.id}
                    itemData={transactionsListItem}
                    deleteTransactionHandler={this.onTransactionDelete}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
