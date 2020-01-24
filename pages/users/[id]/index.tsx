import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'
import Layout from '../../../components/Layout'

const Post: React.FC = () => {
  const router = useRouter()
  const [userState, setUserState] = useState(Object)

  const fetchUser = async (id: string) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      const json = await response.json()
      return json
    } catch (error) {
      setUserState('Error')
    }
  }

  useEffect(() => {
    if (router.query.id) {
      fetchUser(String(router.query.id))
        .then(res => {
          setUserState(res)
        })
    }
  }, [router])
  return (
    <Layout>
      <h1>ID: { userState.id }</h1>
      <p>Name: { userState.name }</p>
    </Layout>
  )
}

export default Post
