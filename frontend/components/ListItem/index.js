import React from 'react'
import Link from 'next/link'

import { Title } from '../../styles/common'
import ListItemStyles from './styles'
import DeleteItem from '../DeleteItem'

export default function ListItem({ item, pathname }) {

  return (
    <ListItemStyles>
      <Title>
        <Link
          href={{
            pathname: pathname,
            query: { id: item.id },
          }}
        >
          <a>
            {item.image && (
              <img src={item.image} alt={item.name} />
            )}
            {item.name}</a>
        </Link>
      </Title>

      <div className="buttonList">
        <Link
          href={{
            pathname: 'update',
            query: { id: item.id },
          }}
        >
          <a>Edit</a>
        </Link>
        <DeleteItem id={item.id}>Delete Phone</DeleteItem>
      </div>
    </ListItemStyles>
  )
}
