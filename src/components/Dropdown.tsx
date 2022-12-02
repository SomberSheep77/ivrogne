import React, { Dispatch, useState } from 'react'
import css from './Dropdown.module.sass'
import { ReactComponent as DropdownArrow } from './assets/icons/dropdown-arrow.svg'

type Props = {
  curItem: any
  setItem: Dispatch<any>
  values: string[]
  children?: React.ReactNode
  selectItem?: () => void
  disabled?: boolean
}

type MultProps = {
  selectItem: (item: string) => void
  values: string[]
  title?: string
  items?: Set<string>
  disabled?: boolean
  children?: React.ReactNode
}

let Dropdown = ({ curItem, setItem, values, disabled }: Props) => {
  const [open, setOpen] = useState(false)
  return (
    <div className={`${css.container}`}>
      <div
        className={`${css.title} ${css.option} ${css.main} ${open && css.open}`}
        onClick={() => setOpen(!open)}
      >
        {curItem}
        <DropdownArrow className={open ? css.rotate : ''} />
      </div>
      {open && (
        <div className={`${css.options}`}>
          {values.map((val, _) => (
            <li
              className={`${css.option} ${val === curItem && css.active}`}
              onClick={() => {
                setItem(val)
                setOpen(false)
              }}
            >
              {val}
            </li>
          ))}
        </div>
      )}
    </div>
  )
}

let MultipleDropdown = ({
  title,
  items,
  selectItem,
  values,
  disabled,
}: MultProps) => {
  const [open, setOpen] = useState(false)
  let itemsStr: string = !items
    ? ''
    : Array.from(items).length === 13
    ? 'All'
    : Array.from(items).length === 0
    ? 'None'
    : Array.from(items).length > 5
    ? Array.from(items).slice(0, 5).join(', ') + '...'
    : Array.from(items).join(', ')
  return (
    <div className={`${css.container} ${disabled && css.disabled}`}>
      <div
        className={`${css.title} ${css.option} ${css.main} ${open && css.open}`}
        onClick={() => setOpen(!disabled && !open)}
      >
        {title} {itemsStr}
        <DropdownArrow className={open ? css.rotate : ''} />
      </div>
      {open && (
        <div className={`${css.options}`}>
          {values.map((val, _) => (
            <li
              className={`${css.option} ${items?.has(val) && css.active}`}
              onClick={() => selectItem(val)}
            >
              {val}
            </li>
          ))}
        </div>
      )}
    </div>
  )
}
export { Dropdown, MultipleDropdown }
