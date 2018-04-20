import React from 'react'

import Icon from 'react-icons-kit'
import { ic_menu, ic_autorenew } from 'react-icons-kit/md'

const SearchBox = () => (
  <form className="searchbox">
    <div className="input-group">
      <div className="input-group-addon">
        {/* <Icon icon={ic_menu} size={28} className="" /> */}
      </div>
      <input
        className="form-control"
        placeholder="Under maintainence..."
      />
    </div>
  </form>
)

const Topbar = ({ onToggleSidebar }) => {
  function reload() {
    location.reload()
  }
  return (
    <div className="topbar">
      <Icon
        icon={ic_menu}
        size={28}
        className="menu-icon"
        onClick={onToggleSidebar}
      />
      <div className="branding">
        <span>
          App <b>Keeper</b>
        </span>
      </div>

      <SearchBox />

      <div className="toolbox">
        <Icon
          icon={ic_autorenew}
          size={28}
          className="toolbox-icon"
          onClick={reload}
        />
      </div>
    </div>
  )
}

export default Topbar
