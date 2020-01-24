import Layout from '../components/Layout'
import Link from 'next/link'
import fetch from '../fetch'

const UsersLink = (props: any) => {
  return (
    <li>
      <Link href={'/users/[id]'} as={`/users/${props.id}`}>
        <a>{ props.name }</a>
      </Link>
    </li>
  )
}

const Index = (props: any) => {
  return (
    <Layout>
      <h1>Home Page</h1>
      <ul>
        {
          props.data.map((item: any, key: any) => (
            <UsersLink key={key} id={item.id} name={item.name}/>
          ))
        }
      </ul>
    </Layout>
  )
}

Index.getInitialProps = async () => {
  try {
    const res = await fetch('http://jsonplaceholder.typicode.com/users/')
    const data = await res.json()

    return {
      data: data.map((item: any) => {
        return {
          id: item.id,
          name: item.name
        }
      })
    }
  } catch {
  }
}

export default Index
