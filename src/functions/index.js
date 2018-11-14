import  React  from 'react'
import { Link } from 'react-router-dom'


export const lister = (objects, show) => {
  return objects.map(obj => {
    return (
      obj.authors ?
      <Link key={obj.id} to={`/channel/${obj.name}`}>
        <li onClick={() => show(obj)}>{obj.name}</li>
      </Link>
     :
      <Link to={{pathname: `/users/${obj.name}`, state: obj.id}}>
        <li key={obj.id} onClick={() => show(obj.id)}>{obj.name}</li>
      </Link>

    )
    }
  )
}
