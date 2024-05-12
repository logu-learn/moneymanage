// Write your code here
import './index.css'

const TransactionItem = props => {
  const {itemData, deleteTransactionHandler} = props
  const {id, title, amount, type} = itemData

  const onTransactionDelete = () => deleteTransactionHandler(id)

  return (
    <li className="transaction-item-container">
      <p className="transaction-title">{title}</p>
      <p className="transaction-detail">{amount}</p>
      <p className="transaction-detail">{type}</p>
      <button
        testid="delete"
        type="button"
        className="transaction-delete-button"
        onClick={onTransactionDelete}
      >
        <img
          className="delete-icon-img"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
