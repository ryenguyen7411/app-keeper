import React from 'react'
import { Link } from 'react-router-dom'

import Icon from 'react-icons-kit'
import {
  ic_archive,
  ic_delete,
  ic_settings,
  ic_highlight
} from 'react-icons-kit/md'
import { handPointerO } from 'react-icons-kit/fa'

const Sidebar = ({ className, tags }) => {
  console.log(tags)

  return (
    <div className={`sidebar ${className}`}>
      <Link className="sidebar-item" to="#notes">
        <Icon size={24} icon={ic_highlight} />
        Ghi chú
      </Link>
      <div className="sidebar-item">
        <Icon size={24} icon={handPointerO} />
        Lời nhắc
      </div>

      <div className="separator" />

      <div className="sidebar-item control j-between">
        <span>Nhãn</span>
        <span className="text-uppercase font-weight-bold">Chỉnh sửa</span>
      </div>

      <div className="separator" />

      <Link className="sidebar-item" to="#archived">
        <Icon size={24} icon={ic_archive} />
        Lưu trữ
      </Link>
      <Link className="sidebar-item" to="#deleted">
        <Icon size={24} icon={ic_delete} />
        Thùng rác
      </Link>

      <div className="separator" />

      <div className="sidebar-item">
        <Icon size={24} icon={ic_settings} />
        Cài đặt
      </div>
    </div>
  )
}

export default Sidebar
