import './index.css'

const PasswordItem = props => {
  const {passwordDetails, isShowPasswordSelected, onChangePasswordsList} = props
  const {
    id,
    websiteName,
    userName,
    userPassword,
    backgroundColorClassName,
  } = passwordDetails
  const initialLetter = userName.slice(0, 1).toUpperCase()
  const onClickDeleteBtn = () => {
    onChangePasswordsList(id)
  }
  return (
    <li className="password-list-container">
      <div className={`initial-container ${backgroundColorClassName}`}>
        <p className="initial">{initialLetter}</p>
      </div>
      <div className="user-details-container">
        <p className="website-name">{websiteName}</p>
        <p className="user-name">{userName}</p>
        {!isShowPasswordSelected ? (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="stars-image"
          />
        ) : (
          <p className="user-password">{userPassword}</p>
        )}
      </div>
      <button
        type="button"
        className="delete-button"
        onClick={onClickDeleteBtn}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-img"
        />
      </button>
    </li>
  )
}

export default PasswordItem
