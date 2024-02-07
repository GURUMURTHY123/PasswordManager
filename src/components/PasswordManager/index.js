import {Component} from 'react'
import {v4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

const backgroundColorClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class PasswordManager extends Component {
  state = {
    passwordsList: [],
    userWebsite: '',
    userName: '',
    userPassword: '',
    isShowPasswordSelected: false,
    searchInput: '',
  }

  onChangePasswordsList = id => {
    const {passwordsList} = this.state
    const updatedPasswordsList = passwordsList.filter(
      eachPassword => eachPassword.id !== id,
    )
    this.setState({passwordsList: updatedPasswordsList})
  }

  onChangePasswordSelected = () => {
    this.setState(prevState => ({
      isShowPasswordSelected: !prevState.isShowPasswordSelected,
    }))
  }

  renderPasswords = (passwordsList, isShowPasswordSelected) => (
    <ul className="passwords-list-container">
      {passwordsList.map(eachPassword => (
        <PasswordItem
          key={eachPassword.id}
          passwordDetails={eachPassword}
          isShowPasswordSelected={isShowPasswordSelected}
          onChangePasswordsList={this.onChangePasswordsList}
        />
      ))}
    </ul>
  )

  renderNoPasswordContainer = () => (
    <div className="empty-password-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-password-img"
      />
      <p className="no-password-text">No Passwords</p>
    </div>
  )

  onChangeWebsiteName = e => {
    this.setState({userWebsite: e.target.value})
  }

  onChangeUserName = e => {
    this.setState({userName: e.target.value})
  }

  onChangeUserPassword = e => {
    this.setState({userPassword: e.target.value})
  }

  onChangeSearchInput = e => {
    this.setState({searchInput: e.target.value})
  }

  onSubmitForm = e => {
    e.preventDefault()
    const {userWebsite, userName, userPassword, passwordsList} = this.state
    if (userWebsite !== '' && userName !== '' && userPassword !== '') {
      const newPasswordList = {
        id: v4(),
        websiteName: userWebsite,
        userName,
        userPassword,
        backgroundColorClassName:
          backgroundColorClassNames[Math.floor(Math.random() * 7)],
      }
      this.setState({
        passwordsList: [...passwordsList, newPasswordList],
        userName: '',
        userPassword: '',
        userWebsite: '',
      })
    }
  }

  render() {
    const {
      passwordsList,
      userWebsite,
      userName,
      userPassword,
      isShowPasswordSelected,
      searchInput,
    } = this.state
    const passwordsCount = passwordsList.length
    const searchedPasswordsList = passwordsList.filter(eachPassword =>
      eachPassword.websiteName
        .toLowerCase()
        .includes(searchInput.toLowerCase()),
    )
    return (
      <div className="app-container">
        <div className="password-manager-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
          <div className="add-password-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="password-manager-img sm-device"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="password-manager-img lg-device"
            />
            <form className="form-container" onSubmit={this.onSubmitForm}>
              <h1 className="heading">Add New Password</h1>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="form-img"
                />
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="user-input"
                  value={userWebsite}
                  onChange={this.onChangeWebsiteName}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="form-img"
                />
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="user-input"
                  value={userName}
                  onChange={this.onChangeUserName}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="form-img"
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="user-input"
                  value={userPassword}
                  onChange={this.onChangeUserPassword}
                />
              </div>
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
          </div>
          <div className="passwords-display-container">
            <div className="password-count-search-container">
              <div className="password-count-container">
                <h1 className="password-count-text">Your Passwords</h1>
                <p className="count">{passwordsCount}</p>
              </div>
              <div className="search-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-img"
                />
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  value={searchInput}
                  onChange={this.onChangeSearchInput}
                />
              </div>
            </div>
            <hr />
            <div className="show-password-container">
              <input
                type="checkbox"
                id="checkbox"
                className="checkbox"
                onChange={this.onChangePasswordSelected}
              />
              <label htmlFor="checkbox">Show Passwords</label>
            </div>
            {searchedPasswordsList.length > 0
              ? this.renderPasswords(
                  searchedPasswordsList,
                  isShowPasswordSelected,
                )
              : this.renderNoPasswordContainer()}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
