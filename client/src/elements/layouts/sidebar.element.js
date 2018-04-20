import React from 'react'
import { Link } from 'react-router-dom'

import Icon from 'react-icons-kit'
import { ic_menu } from 'react-icons-kit/md'

const Sidebar = ({ className }) => (
  <div className={`sidebar ${className}`}>
    <Link className="sidebar-item" to="#notes">
      <Icon size={24} icon={ic_menu} />
      Ghi chú
    </Link>
    <div className="sidebar-item">
      <Icon size={24} icon={ic_menu} />
      Lời nhắc
    </div>

    <div className="separator" />

    <div className="sidebar-item control j-between">
      <span>Nhãn</span>
      <span className="text-uppercase font-weight-bold">Chỉnh sửa</span>
    </div>

    <div className="separator" />

    <Link className="sidebar-item" to="#archived">
      <Icon size={24} icon={ic_menu} />
      Lưu trữ
    </Link>
    <div className="sidebar-item">
      <Icon size={24} icon={ic_menu} />
      Thùng rác
    </div>

    <div className="separator" />

    <div className="sidebar-item">
      <Icon size={24} icon={ic_menu} />
      Cài đặt
    </div>
  </div>
)

export default Sidebar
