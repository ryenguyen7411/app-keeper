import React from 'react'
import { Link } from 'react-router-dom'

import Icon from 'react-icons-kit'
import {
  ic_archive,
  ic_delete,
  ic_settings,
  ic_highlight
} from 'react-icons-kit/md'
import { handPointerO, tag as faTag } from 'react-icons-kit/fa'
import { ic_add } from 'react-icons-kit/md'

const Sidebar = ({ className, tags = [] }) => {
  return (
    <div className={`sidebar ${className}`}>
      <div className="sidebar-inner">
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
        <span
          className="text-uppercase font-weight-bold"
          data-toggle="modal"
          data-target="#tag-modal">
          Chỉnh sửa
        </span>
      </div>
      {tags.map(tag => (
        <Link
          key={`tag-${tag.id}`}
          className="sidebar-item"
          to={`#tags/${tag.title}`}>
          <Icon size={24} icon={faTag} />
          {tag.title}
        </Link>
      ))}
      <div
        className="sidebar-item"
        data-toggle="modal"
        data-target="#tag-modal">
        <Icon size={24} icon={ic_add} />
        Tạo nhãn mới
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
      </div></div>
    </div>
  )
}

export default Sidebar
